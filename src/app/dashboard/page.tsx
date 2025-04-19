import axios from "axios"

export default async function Dashboard() {

    try {
        const response = await axios.get('http://localhost:3000/upload/getImages', {
            params: {
                id: 3
            },
        })
        if (response.status === 200) {
            console.log(response)
        } else {
            console.log("facing error fetching images: ", response.data)
        }
    } catch (err) {
        console.log("error fetching images: ", err)
    }

    return (
        <>
            <div className="flex justify-center items-center">
                <p> hi i am dashboard </p>
            </div>
        </>
    )
}