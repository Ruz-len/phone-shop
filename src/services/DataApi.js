import { REDMI_URL } from '../constants/api';

class DataApi {
    async getData(url) {
        const body = await fetch(url);
        if (!body.ok) throw new Error('fetch failed');
        return await body.json();
    }

    async getRedmiProducts() {
        return await this.getData(REDMI_URL);
    }
}

export { DataApi };