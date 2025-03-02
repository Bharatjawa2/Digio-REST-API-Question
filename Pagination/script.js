async function FetchData(){
    let ans=[];
    try {
        const nation=document.getElementById("nation").value.toLowerCase();
        const valuation=document.getElementById("valuation").value.toLowerCase();
        const titles=document.getElementById("Titles").value.toLowerCase();

        const FirstResponse=await fetch(`https://jsonmock.hackerrank.com/api/football_teams?nation=${nation}&page=1`);
        
        if(!FirstResponse.ok){
            throw new Error("No items Found.")
        }
        const FirstData= await FirstResponse.json();
        let totalPages=FirstData.total_pages;

        for(let i=1;i<=totalPages;i++){
            const response=await fetch(`https://jsonmock.hackerrank.com/api/football_teams?nation=${nation}&page=${i}`);
            const data= await response.json();

            const filterTeam=data.data.filter(team=>
                team.estimated_value_numeric>=valuation && team.number_of_league_titles_won>=titles
            );

            ans.push(...filterTeam);
        }
        displayResults(ans);
    } catch (error) {
        console.log(error);
    }
}

function displayResults(teams){
    const res=document.getElementById("results");
    res.innerHTML="" //Clear Previous Results
    if(teams.length==0){
        res.innerHTML="<p>No Teams Found.</p>"
        return;
    }
    teams.forEach(team => {
        let teamInfo = `<p><strong>${team.name}</strong> - Valuation: $${team.estimated_value_numeric}, Titles Won: ${team.number_of_league_titles_won}</p>`;
        res.innerHTML += teamInfo;
    });
}