const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            token: null,
            demo: []
        },
        actions: {
            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },

            register: async (email, password) => {
                const resp = await fetch(process.env.BACKEND_URL + "/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                });

                if (resp.ok) {
                    console.log("User registered successfully");
                    return true;
                } else {
                    console.error("Error registering user");
                    return false;
                }
            },

            login: async (email, password) => {
                const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                });
                
                if (resp.ok) {
                    const data = await resp.json();
                    localStorage.setItem("token", data.access_token);
                    setStore({ token: data.access_token });
                    return true;
                } else {
                    console.error("Error logging in");
                    return false;
                }
            },

            getProtectedData: async () => {
                const store = getStore();
                const token = store.token || localStorage.getItem("token");
                
                if (!token) {
                    console.error("No token found");
                    return null;
                }

                const resp = await fetch(process.env.BACKEND_URL + "/api/protected", {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + token
                    }
                });
                
                if (resp.ok) {
                    const data = await resp.json();
                    console.log(data);
                    return data;
                } else {
                    console.error("Error fetching protected data");
                    return null;
                }
            }
        }
    };
};

export default getState;
