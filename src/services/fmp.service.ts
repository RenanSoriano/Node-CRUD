import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();


export default class FmpService {
    private apiKey: string;
    private baseUrl: string;

    constructor() {
        this.apiKey = process.env.FMP_API_KEY || '';
        if (!this.apiKey) {
            throw new Error('FMP_API_KEY is not defined in environment variables');
        }
        this.baseUrl = 'https://financialmodelingprep.com/api/v3';
    }

    async getHistoricalPrices(symbol: string): Promise<any> {
        try {
            const response = await axios.get(
                `${this.baseUrl}/quote/${symbol}`,
                {
                    params: {
                        apikey: this.apiKey,
                        timeseries: 1,
                        serietype: 'line',
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching historical prices:', error);
            throw error;
        }
    }
}