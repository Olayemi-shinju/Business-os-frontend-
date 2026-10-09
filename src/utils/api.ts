const API_BASE_URI = import.meta.env.VITE_API_BASE_URI
console.log(API_BASE_URI)

export const api = {
    get: async(endpoint: string)=>{
        const res = await fetch(`${API_BASE_URI}/${endpoint}`, {
            credentials: "include"
        })
        if(!res.ok) throw new Error("Network Response not ok")
            return res.json()
    },

    post: async(endpoint: string, data:any)=>{
        const res = await fetch(`${API_BASE_URI}/${endpoint}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
            credentials: "include"
        });
        if(!res.ok) throw new Error("Failed to post data")
    },
    put: async(endpoint: string, data: any)=>{
        const res = await fetch(`${API_BASE_URI}/${endpoint}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
            credentials: "include"
        })
        if(!res.ok) throw new Error("Failed to update")
    },
    delete: async(endpoint: string)=>{
        const res= await fetch(`${API_BASE_URI}/${endpoint}`,{
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            credentials: "include"
        })

        if(!res.ok) throw new Error("Failed to delete data")
            return res.json()
    }
}