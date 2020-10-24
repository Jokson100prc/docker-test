$(document).ready(function () {
    $('#table_id').DataTable();
});

$(document).ready(function () {
    $("a").click(function (event) {
        alert("As you can see, the link no longer took you to jquery.com");

        event.preventDefault();
    });
});

$("button.continue").html("Next Step...");

function loadDoc() {
    // ('https://cors-anywhere.herokuapp.com/http://localhost:9200/jok/_search'
    fetch("/elastic/jok/_search", {
            method: "POST",
            body: JSON.stringify({
                query: {
                    match_all: {},
                },
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
        .then(function (response) {
            if (response.ok) {
                
                return response.json();
            }
            return Promise.reject(response);
        })
        .then(function (data) {
            const zmienna = data.hits.hits;
            // console.log(zmienna); 

                const mojaZmienna = [];
            for (const index of zmienna) {
                // console.log(index);
                // const adres= index._source.adres;
                // const wiek= index._source.wiek;
                // console.log(`to jest ${adres}
                // a to jest ${wiek}`);

                mojaZmienna.push(Object.values(index._source));
                console.log(mojaZmienna);
            $(document).ready(function() {
                $('#example').DataTable( {
                    data: mojaZmienna,
                    columns: [
                        { title: "adres" },
                        { title: "wiek" },
                    ]
                } );
            } );
                
            }

        })
        .catch(function (error) {
            console.warn("Something went wrong.", error);
        });
}