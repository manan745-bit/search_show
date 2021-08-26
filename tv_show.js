console.log("connected");
const form=document.querySelector("#form");
const inp=document.querySelector("#inp");
const search_history=new Array();
var fetch_data=new Array();
const re=document.querySelector("#re");
const go=document.querySelector("#button");
re.disabled=true;

function reset()
{
	var wish=confirm("Do you want to research?");
	if(wish)
	{
	document.location.reload(true);

	re.disabled=true;
	go.disabled=false;
	inp.disabled=false;
}}




form.addEventListener('submit',async function(e){
	e.preventDefault();
	
	

const searchTerm=inp.value;
	if (searchTerm==="")
	{
		alert("Blank Search");

	}
	else if(search_history.includes(searchTerm))
	{
		alert("You've already searched!");
	}
    else
	{
    
    search_history.push(searchTerm);
	const url='http://api.tvmaze.com/search/shows?q='+searchTerm;
    const res=await axios.get(url);
	fetch_data=res.data;
	if (fetch_data.length==0)
	{
		alert("Sorry! No data has been found!!!");
		
	}
	else{
    viewImages(fetch_data);
console.log(fetch_data);
go.disabled=true;
inp.disabled=true;
re.disabled=false;}}

    
});

function webChannel(result)
{
	if(result.show.webChannel===null)
		{return "Not Available"}
	else
		{return result.show.webChannel.name;}
}

const viewImages=(shows)=>
{
	for(let result of shows)

	{   //console.log(result);

		if(result.show.image)
		{

		const img=document.createElement('img');
		const para=document.createElement('p');
		para.className="summary";
		if(result.show.summary!=null)
		{
	
		const channel=webChannel(result);
		
		para.innerHTML=result.show.name+"<br>"+"Streaming On: "+channel+result.show.summary;
		img.src=result.show.image.medium;
		
		
		
		const place=document.querySelector("#place")
		place.appendChild(img);
		place.appendChild(para);
	}
}
}}



