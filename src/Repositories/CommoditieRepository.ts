import { Repository } from "typeorm";
import Commoditie from "../entities/Commoditie";
import InterfaceCommoditieRepository from "./Interfaces/InterfaceCommoditiesRepository";
import axios from 'axios';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();


    //public antes de todo async
export default class CommoditieRepository implements InterfaceCommoditieRepository {
    private CommoditieRepository: Repository<Commoditie>;
    private apiKey: string;
    private baseUrl: string;

    constructor(CommoditieRepository: Repository<Commoditie>) {
        this.CommoditieRepository = CommoditieRepository;
        this.apiKey = process.env.FMP_API_KEY || '';
        if (!this.apiKey) {
            throw new Error('FMP_API_KEY is not defined');
        }
        this.baseUrl = 'https://financialmodelingprep.com/api/v3';
    }

    private async getHistoricalPrices(symbol: string): Promise<any> {
        try {
            const response = await axios.get(
                `${this.baseUrl}/quote/${symbol}`,
                {
                    params: {
                        apikey: this.apiKey,
                        //timeseries: 1,//talvez tenha que tirar o timeseries e o serietype
                        //serietype: 'line',
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching historical prices:', error);
            throw error;
        }
    }

    // Fetch all commodities
    public async getCommodities(): Promise<Commoditie[]> {
        return await this.CommoditieRepository.find();
    }

    // Fetch a single commodity by ID
    public async getCommoditieById(id: string): Promise<{ success: boolean; message?: string; commoditie?: Commoditie }> {
        try {
            const commoditie = await this.CommoditieRepository.findOne({ 
                where: {
                    id
                }
            });

            if (!commoditie) {
                return {
                    success: false,
                    message: `Commoditie not found`,
                };
            }

                    return {
                        success: true,
                        commoditie,
                    };
                } catch (error) {
                    return {
                        success: false,
                        message: `Failed to fetch commoditie: ${error instanceof Error ? error.message : String(error)}`,
                    };
                }
            }



    public async createCommoditie(commoditie: Commoditie): Promise<{ success: boolean; message?: string }> {
        try {
            const apiJSON = await this.getHistoricalPrices(commoditie.symbol);
            if (!apiJSON || apiJSON.length === 0) {
                throw new Error('No historical prices found for the given symbol');
            }

            const apiResponse = apiJSON[0];
            commoditie.id = uuidv4();
            commoditie.price = apiResponse.price;
            commoditie.dayLow = apiResponse.dayLow;
            commoditie.dayHigh = apiResponse.dayHigh;
            commoditie.openPrice = apiResponse.openPrice;
            commoditie.previousClose = apiResponse.previousClose;
            await this.CommoditieRepository.save(commoditie);
            return {success: true};
        } catch (error) {
            return {
                success: false,
                message: `Could not insert data: ${error}`,
            };
        }
    }
}