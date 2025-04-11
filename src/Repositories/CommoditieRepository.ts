import { Repository } from "typeorm";
import Commoditie from "../entities/Commoditie";
import InterfaceCommoditieRepository from "./Interfaces/InterfaceCommoditiesRepository";

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
            const commoditie = await this.CommoditieRepository.findOneBy({ id });

            if (!commoditie) {
                return {
                    success: false,
                    message: `Commoditie with ID ${id} not found`,
                };
            }

            return {
                success: true,
                commoditie,
            };
        } catch (error) {
            return {
                success: false,
                message: `Error fetching commoditie: ${error instanceof Error ? error.message : String(error)}`,
            };
        }
    }

    // Create a new commodity
    async createCommoditie(commoditie: Commoditie): Promise<{ success: boolean; message?: string }> {
        try {
            await this.CommoditieRepository.save(commoditie);
            return {
                success: true,
                message: "Commoditie created successfully",
            };
        } catch (error) {
            return {
                success: false,
                message: `Failed to create commoditie: ${error instanceof Error ? error.message : String(error)}`,
            };
        }
    }

    // Update an existing commodity
    async updateCommoditie(
        id: string,
        updatedFields: Partial<Commoditie>
    ): Promise<{ success: boolean; message?: string }> {
        try {
            const existingCommoditie = await this.CommoditieRepository.findOneBy({ id });

            if (!existingCommoditie) {
                return {
                    success: false,
                    message: `Commoditie with ID ${id} not found`,
                };
            }

            await this.CommoditieRepository.update(id, updatedFields);
            return {
                success: true,
                message: "Commoditie updated successfully",
            };
        } catch (error) {
            return {
                success: false,
                message: `Failed to update commoditie: ${error instanceof Error ? error.message : String(error)}`,
            };
        }
    }

    // Delete a commodity by ID
    async deleteCommoditie(id: string): Promise<{ success: boolean; message?: string }> {
        try {
            const result = await this.CommoditieRepository.delete(id);

            if (result.affected === 0) {
                return {
                    success: false,
                    message: `Commoditie with ID ${id} not found`,
                };
            }

            return {
                success: true,
                message: "Commoditie deleted successfully",
            };
        } catch (error) {
            return {
                success: false,
                message: `Failed to delete commoditie: ${error instanceof Error ? error.message : String(error)}`,
            };
        }
    }

    // Bulk create or update commodities
    async bulkUpsertCommodities(commodities: Commoditie[]): Promise<{ success: boolean; message?: string }> {
        try {
            await this.CommoditieRepository.save(commodities, { chunk: 50 });
            return {
                success: true,
                message: "Commodities upserted successfully",
            };
        } catch (error) {
            return {
                success: false,
                message: `Failed to upsert commodities: ${error instanceof Error ? error.message : String(error)}`,
            };
        }
    }
}