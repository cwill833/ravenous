const YELP_KEY = process.env.YELP_KEY;

const Yelp = {
    search(term, location, sortBy){
        const endpoint = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}&limit=20`
        return fetch(endpoint, {
            headers: {
                Authorization: `Bearer ${YELP_KEY}`
            },
            mode: 'no-cors'
        }).then(response=>{
            return response.json()
        }).then(jsonResponse=>{
            if(jsonResponse.businesses){
                return jsonResponse.businesses.map(business=>{
                    return {
                        id: business[0].id,
                        imageSrc: business[0].image_url,
                        name: business[0].name,
                        address: business[0].location.address1,
                        city: business[0].location.city,
                        state: business[0].location.state,
                        zipCode: business[0].location.zip_code,
                        category: business[0].category[0].title,
                        rating: business[0].rating,
                        reviewCount: business[0].review_count
                    }
                })
            } 
        })
    }
}
  

export default Yelp