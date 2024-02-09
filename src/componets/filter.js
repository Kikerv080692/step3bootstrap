import Board from "./board.js";

class Filter {
    collectDataFromFilterForm(e){
        e.preventDefault();
    
        const filterParams = {};
        
        const formFilter = document.getElementById("filter__form");

        const formData = new FormData(formFilter);

        for (const [key, value] of formData.entries()) {
            if (value !== "") {
                filterParams[key] = value;
            }
        }
        console.log(filterParams);
      
        const board = new Board();
        board.getVisits(filterParams);
    }

    searchCards(visits, filterParams){
        if(filterParams && Object.keys(filterParams).length){

            return visits.filter((card) => { 
                
              return card.data.description?.toLowerCase().includes(filterParams.description?.toLowerCase() ||  '') && card.data?.term === filterParams.term 
            });
        }
        return visits;
    }
}
export default Filter;