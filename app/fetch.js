// $(document).ready(function () {
//   $("#table_id").DataTable();
// });

$(document).ready(function () {
  //   $("a").click(function (event) {
  //     alert("As you can see, the link no longer took you to jquery.com");

  //     event.preventDefault();
  //   });

  $("#example").dataTable({
    ajax: {
      url: "elastic/jok/_search",
      type: "POST",
      data: {
        query: {
          match_all: {},
        },
      },
      contentType: "application/json",
      dataType: "json",
      dataSrc: function (json) {
        const result = [];
        const hits = json.hits.hits;
        for (const data of hits) {
          result.push(Object.values(data._source));
        }
        return result;
      },
    },
    columns: [{ title: "adres" }, { title: "wiek" }],
  });

  $("#add").click(function () {
    const address = document.getElementById("address");
    const age = document.getElementById("age");

    const valueAddress = address.value;
    const valueAge = age.value;
    //   console.log(valueAddress);
    //   console.log(valueAge);

    fetch("/elastic/jok/_doc", {
      method: "POST",
      body: JSON.stringify({
        adres: valueAddress,
        wiek: valueAge,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => {
        $("#example").DataTable().ajax.reload();
      })
      .catch(function (error) {
        console.warn("Something went wrong.", error);
      });
  });

  // function loadDoc() {
  //   fetch("/elastic/jok/_search", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       query: {
  //         match_all: {},
  //       },
  //     }),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //   })
  //     .then(function (response) {
  //       if (response.ok) {
  //         return response.json();
  //       }
  //       return Promise.reject(response);
  //     })
  //     .then(function (data) {
  //       const zmienna = data.hits.hits;
  //       // console.log(zmienna);

  //       const mojaZmienna = [];
  //       for (const index of zmienna) {
  //         // console.log(index);
  //         // const adres= index._source.adres;
  //         // const wiek= index._source.wiek;
  //         // console.log(`to jest ${adres}
  //         // a to jest ${wiek}`);

  //         mojaZmienna.push(Object.values(index._source));
  //         console.log(mojaZmienna);

  //       }
  //       $(document).ready(function () {
  //         table = $("#example").DataTable({
  //           data: mojaZmienna,
  //           columns: [{ title: "adres" }, { title: "wiek" }],
  //         });
  //       });
  //     })
  //     .catch(function (error) {
  //       console.warn("Something went wrong.", error);
  //     });
});
