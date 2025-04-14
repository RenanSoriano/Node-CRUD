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



    public async createCommoditie(symbol: string): Promise<{ success: boolean; message?: string }> {
        try {
            const apiJSON = await this.getHistoricalPrices(symbol);
            if (!apiJSON) {
                return {
                    success: false,
                    message: `Could not get data from API`,
                };
            }

            const apiResponse = apiJSON[0];
            const coffeeStock = new Commoditie(
                uuidv4(),
                apiResponse.name ,
                symbol, 
                apiResponse.price,
                apiResponse.dayLow,
                apiResponse.dayHigh,
                apiResponse.openPrice,
                apiResponse.previousClose
            );
            await this.CommoditieRepository.save(coffeeStock);
            return {success: true};
        } catch (error) {
            return {
                success: false,
                message: `Could not insert data: ${error}`,
            };
        }
    }
}