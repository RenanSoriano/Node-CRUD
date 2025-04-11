import { Repository } from "typeorm";
import Commoditie from "../entities/Commoditie";
import InterfaceCommoditieRepository from "./Interfaces/InterfaceCommoditiesRepository";
    // actually is necessary to implement getStockById and createStock.
    // Frontend will call the routes when populating the dashboard, pages
    // and when the system inserts new data in db.
        // createStock will need to collect the data from the fmp api. So, you 
    // could implement the fmp.service method in this class, this approach
    // turns this file greater, but as this is a fundamental part of the method 
    // consider mantining it here.
export default class CommoditieRepository implements InterfaceCommoditieRepository {
    private CommoditieRepository: Repository<Commoditie>;

    constructor(CommoditieRepository: Repository<Commoditie>) {
        this.CommoditieRepository = CommoditieRepository;
    }

    // Fetch all commodities
    async getCommodities(): Promise<Commoditie[]> {
        return await this.CommoditieRepository.find();
    }

    // Fetch a single commodity by ID
    async getCommoditieById(id: string): Promise<{ success: boolean; message?: string; commoditie?: Commoditie }> {
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


    // Create a new commodity
    async createCommoditie(commoditie: Commoditie): Promise<{ success: boolean; message?: string }> {
        try {
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