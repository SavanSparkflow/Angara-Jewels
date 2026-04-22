fetch('https://api.exchangerate-api.com/v4/latest/INR')
    .then(res => res.json())
    .then(data => {
        console.log(Object.keys(data.rates).length);
        console.log(Object.keys(data.rates).slice(0, 10));
    });
