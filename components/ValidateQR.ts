import { API_KEY, API_URL } from '@env';

export async function fetchData(param: string) {
    try {
        const res = await fetch(`${API_URL}/${param}`, {
            method: 'POST',
            headers: {
                'x-api-key': `${API_KEY}`,
                'Content-Type': 'application/json'
            },
        });

        if(!res.ok) throw new Error('Failed to fetch');
        return await res.json();
    }catch(error) {
        console.log(error);
        throw error;
    }
}