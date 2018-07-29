import React, { Component } from "react";
import fire from "../../config/Fire";

class Home extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      orders: []
      // DANE_KLIENTA: [],
      //ZAMOWIENIE: []
    };
  }
  /*
    componentDidMount() {
    const itemsRef = fire.database().ref("orders");
    itemsRef.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          email: items[item].DANE_KLIENTA.email,
          name: items[item].DANE_KLIENTA.name,
          city: items[item].DANE_KLIENTA.city,
          houseNumber: items[item].DANE_KLIENTA.houseNumber,
          phone: items[item].DANE_KLIENTA.phone
        });
      }
      this.setState({
        DANE_KLIENTA: newState
      });
    });

    const itemsRef2 = fire.database().ref("orders");
    const xyz = itemsRef2.child("orders/ZAMOWIENIE");
    var items2 = [];
    itemsRef2.on("value", snapshot => {
      items2 = snapshot.val();
      let x = snapshot.val();
      console.log(xyz);
      let newState2 = [];
      for (let item in items2) {
        newState2.push({
          id: item,
          email2: items2[item].ZAMOWIENIE[0].A,
          name2: items2[item].ZAMOWIENIE[0].B
          //a: items2[item].ZAMOWIENIE[1].A,
          // b: items2[item].ZAMOWIENIE[1].B
        });
        console.log("dlugosc: " + xyz.length);
      }

      this.setState({
        ZAMOWIENIE: newState2
      });
    });
  }
*/
  componentDidMount() {
    const itemsRef = fire.database().ref("orders");
    itemsRef.on("value", snapshot => {
      let items = snapshot.val();
      var x = 0;
      console.log("-------------");
      //console.log(items);
      let newState = [];
      for (let item in items) {
        //console.log(items[item]);
        for (let inside in items[item]) {
          //console.log(items[item][inside]);
          for (let i in items[item][inside]) {
            //console.log(i);
            var x = x + 1;

            newState.push({
              city: items[item][inside].city
            });
            console.log("/////////////");
            console.log(items[item][inside].city);
            console.log("x" + x);
          }
        }
        this.setState({
          orders: newState
        });
      }
      //}
      /*for (let item in items) {
        newState.push({
          id: item,
          name: items[item].DANE_KLIENTA.name,
          idNumber: items[item].DANE_KLIENTA.idNumber,
          sponsorName: items[item].DANE_KLIENTA.sponsorName,
          idSponsor: items[item].DANE_KLIENTA.idSponsor,
          email: items[item].DANE_KLIENTA.email,
          houseNumber: items[item].DANE_KLIENTA.houseNumber,
          street: items[item].DANE_KLIENTA.street,
          city: items[item].DANE_KLIENTA.city,
          postCode: items[item].DANE_KLIENTA.postCode,
          phone: items[item].DANE_KLIENTA.phone,

          zam1: items[item].ZAMOWIENIE[0].A,
          zam2: items[item].ZAMOWIENIE[0].B
        });
      }
      */
      // this.setState({
      //   orders: newState
      // });
    });

    /*
  const itemsRef2 = fire.database().ref("orders");
  const xyz = itemsRef2.child("orders/ZAMOWIENIE");
  var items2 = [];
  itemsRef2.on("value", snapshot => {
    items2 = snapshot.val();
    let x = snapshot.val();
    console.log(xyz);
    let newState2 = [];
    for (let item in items2) {
      newState2.push({
        id: item,
        email2: items2[item].ZAMOWIENIE[0].A,
        name2: items2[item].ZAMOWIENIE[0].B
        //a: items2[item].ZAMOWIENIE[1].A,
        // b: items2[item].ZAMOWIENIE[1].B
      });
      console.log("dlugosc: " + xyz.length);
    }

    this.setState({
      ZAMOWIENIE: newState2
    });
  });
  */
  }
  logout() {
    fire.auth().signOut();
  }

  render() {
    return (
      <div>
        <main className="container">
          <button onClick={this.logout} className="btn btn-success btn-lg ml-3">
            Logout
          </button>

          {this.state.orders.map(item => {
            return (
              <div className="card m-3">
                <div className="card-header text-center table-card-orders">
                  ZAMOWIENIE: {item.city}
                </div>
                <div className="card-body">
                  <table className="table table-bordered">
                    <thead className="thead-light" />
                    <tbody>
                      <tr>
                        <th scope="row">Imie:</th>
                        <td>imie</td>
                        <th>Numer domu:</th>
                        <td>house number</td>
                      </tr>
                      <tr>
                        <th scope="row">Numer id:</th>
                        <td>numer id</td>
                        <th>Ulica:</th>
                        <td>street</td>
                      </tr>
                      <tr>
                        <th scope="row">Imie sponosora:</th>
                        <td>imie sponsira</td>
                        <th>Miasto:</th>
                        <td>miasto</td>
                      </tr>
                      <tr>
                        <th scope="row">Id sponosora:</th>
                        <td>sponsor id</td>
                        <th>Kod pocztowy:</th>
                        <td>psot kod</td>
                      </tr>
                      <tr>
                        <th scope="row">E-mail:</th>
                        <td>email</td>
                        <th>Nr tel.:</th>
                        <td>phone</td>
                      </tr>
                    </tbody>
                  </table>

                  <table className="table table-bordered">
                    <thead className="thead-light ">
                      <tr>
                        <th className="table-header-orders" scope="col">
                          Lp:
                        </th>
                        <th className="table-header-orders" scope="col">
                          Numer Produktu
                        </th>
                        <th className="table-header-orders" scope="col">
                          Ilość
                        </th>
                        <th className="table-header-orders" scope="col">
                          Nazwa Produktu
                        </th>
                        <th className="table-header-orders" scope="col">
                          Punkty
                        </th>
                        <th className="table-header-orders" scope="col">
                          Cena Dystrybutora
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>numer</td>
                        <td>ilosc</td>
                        <td>nazwa</td>
                        <td>punkty</td>
                        <td>cena</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </main>
      </div>
    );
  }
}
export default Home;
