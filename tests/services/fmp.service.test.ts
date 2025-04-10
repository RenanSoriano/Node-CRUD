import fs from 'fs';
import path from 'path';
import axios from 'axios';
import {FmpService} from '../../src/services/fmp.service';

jest.mock('axios');

describe('FmpService', () => {
    const mockApiResponse = {
        symbol: 'AAPL',
        historical: [
            { date: '2023-01-01', close: 150 },
            { date: '2023-01-02', close: 152 },
        ],
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch historical prices and save data to a txt file', async () => {
        // Mock the axios response
        (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockApiResponse });

        const symbol = 'AAPL';
        const fmpService = new FmpService();
        const data = await fmpService.getHistoricalPrices(symbol);

        // Verify the API response
        expect(data).toEqual(mockApiResponse);
        expect(axios.get).toHaveBeenCalledWith(
            `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}`,
            {
                params: {
                    apikey: process.env.FMP_API_KEY,
                    timeseries: 1,
                    serietype: 'line',
                },
            }
        );

        // Save data to a txt file
        const filePath = path.join(__dirname, `${symbol}_historical_prices.txt`);
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

        // Verify the file was created and contains the correct data
        const savedData = fs.readFileSync(filePath, 'utf-8');
        expect(savedData).toBe(JSON.stringify(data, null, 2));

        // Clean up the created file
        //fs.unlinkSync(filePath);
    });
});