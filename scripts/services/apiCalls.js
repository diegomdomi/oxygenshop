export const sendForm = async ( url, name, email) => {
    
    try{
        const result = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
              Name: name,
              Email:email,
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
          const data = await result.json();
          console.log(data)
      }
      catch (err) {
        alert(`Sorry we have some problems with the form: ${err}`)
      }
}

