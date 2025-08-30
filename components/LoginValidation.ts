import { API_KEY, API_URL, ORIGIN } from "@env";

export async function UserLogin (email: string, password: string) {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Accept': 'applcation/json',
                'Content-Type': 'application/json',
                'x-api-key': `${API_KEY}`,
                'Origin': `${ORIGIN}`
            },
            body: JSON.stringify({ email, password })
        });
    
        const data = await response.json();
    
        if(!data.ok) {
            throw new Error('Login Failed.'); 
        }
    
        return data;
    }catch(error) {
        throw error;
    }

}