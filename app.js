const form=document.querySelector('form');
const input=document.querySelector('#inp');
const result=document.querySelector('#result');
const btn=document.querySelector('#btn');

// form.addEventListener('submit',(e)=>{
//     e.preventDefault();

//     const city=input.value;

//     getDetails(city);

//     input.value="";
// });

btn.addEventListener('click',()=>{
    const city=input.value;

    if(city==="")
    {
        result.innerHTML=`<h2 style="background-color:white;">Please enter your city!!!</h2>`;
        return;
    }

    result.innerHTML="";

    changeImages(city);
    
    getDetails(city);

    input.value="";
});


// Background images
const body=document.querySelector('body');
    
function changeImages(city)
{
    let ajax=new XMLHttpRequest;
    let id='mCZPKJgNRGlItU7pWfRe4nRUpHaoMlSmnNBIFemiVdM';
    let url=`https://api.unsplash.com/search/photos?query=${city}&client_id=${id}`;

    ajax.open('GET',url,true);

    ajax.onreadystatechange=function()
    {
        if(this.status===200)
        {
            console.log(this.responseText);
            let data = JSON.parse(this.responseText);
            let image=data.results[0].urls.raw;
            let desc=data.results[0].description;
            // body.style.backgroundImage=`${image}`;
            body.style.backgroundImage=`url('${image}')`;
            console.log(desc);
        }
        else
        {
            console.log("Oops!!! There was an error.");
        }
    }
    ajax.send();
}

//Details for weather
function getDetails(city)
{
    const apiKey='5671b4520efb052dc5bcbd4f403d4227';
    const url=`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
    fetch(url)
        .then((res)=>{
            return res.json();
        })
        .then((data)=>{
            const city=data.name;
            const country=data.sys.country;
            const humidity=data.main.humidity;
            const temp=Math.round(data.main.temp-273.15);

            const table=document.createElement('table');
            table.innerHTML=`
                <style>
                    table{
                        width:100%;
                        background-color:white;
                    }
                    tr{
                        background-color:white;
                    }
                    th{
                        float: left;
                        background-color:white;
                    }
                    td{
                        float:right;
                        margin-right:2px;
                        background-color:white;
                    }
                </style>
                <tr>
                    <th>City</th>
                    <td>${city}</td>
                </tr>
                <hr style="width:75%">
                <tr>
                    <th>Country</th>
                    <td>${country}</td>
                </tr>
                <tr>
                    <th>Temperature</th>
                    <td>${temp} \u00B0 C</td>
                </tr>
                <tr>
                    <th>Humidity</th>
                    <td>${humidity}</td>
                </tr>
            `

            result.append(table);

            const dte=new Date();
            const date=dte.getDate();
            var month=dte.getMonth();
            const year=dte.getFullYear();
            var day=dte.getDay();
            const time=dte.getHours()+":"+dte.getMinutes()+":"+dte.getSeconds();

            //for day
            if(day===1)
            {
                day='Monday';
            }
            else if(day===2)
            {
                day='Tuesday';
            }
            else if(day===3)
            {
                day='Wednesday';
            }
            else if(day===4)
            {
                day='Thursday';
            }
            else if(day===5)
            {
                day='Friday';
            }
            else if(day===6)
            {
                day='Saturday';
            }
            else if(day===0)
            {
                day='Sunday';
            }

            // for month
            if(month===0)
            {
                month='January';
            }
            else if(month===1)
            {
                month='February';
            }
            else if(month===2)
            {
                month='March';
            }
            else if(month===3)
            {
                month='April';
            }
            else if(month===4)
            {
                month='May';
            }
            else if(month===5)
            {
                month='June';
            }
            else if(month===6)
            {
                month='July';
            }
            else if(month===7)
            {
                month='August';
            }
            else if(month===8)
            {
                month='September';
            }
            else if(month===9)
            {
                month='October';
            }
            else if(month===10)
            {
                month='November';
            }
            else if(month===11)
            {
                month='December';
            }
            
            const h3=document.createElement('h3');
            h3.innerHTML=`
                <style>background-color:white;</style>
                ${date} ${month}, ${year}
                <br>(${day})<br>
                ${time}
            `
            result.append(h3);
        })
        .catch((err)=>{
            console.log(err);
        })
}