import axios from "axios"
import { useEffect, useState } from "react"

const useHomePage = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/home/');
                setData(response.data)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false)
            }
        }
        fetchData()

    }, [])

    return { data, loading, error }

}


export default useHomePage