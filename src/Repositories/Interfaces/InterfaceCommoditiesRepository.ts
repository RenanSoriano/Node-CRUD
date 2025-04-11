import Commoditie from "../../entities/Commoditie";

export default interface InterfaceCommoditieRepository {
    // Fetch all commodities
    getCommodities(): Promise<Commoditie[]>;

    // Fetch a single commodity by ID
    getCommoditieById(id: string): Promise<{
        success: boolean;
        message?: string;
        commoditie?: Commoditie;
    }>;

    // Create a new commodity
    createCommoditie(commoditie: Commoditie): Promise<{
        success: boolean;
        message?: string;
    }>;

    // Update an existing commodity
    updateCommoditie(
        id: string,
        updatedFields: Partial<Commoditie>
    ): Promise<{
        success: boolean;
        message?: string;
    }>;

    // Delete a commodity by ID
    deleteCommoditie(id: string): Promise<{
        success: boolean;
        message?: string;
    }>;

    // Bulk create or update commodities
    bulkUpsertCommodities(commodities: Commoditie[]): Promise<{
        success: boolean;
        message?: string;
    }>;
}