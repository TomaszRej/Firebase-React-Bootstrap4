import React, { Component } from "react";
import fire from "../../config/Fire";

class Home extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      orders: []
    };
  }

  componentDidMount() {
    const itemsRef = fire.database().ref("orders");
    itemsRef.on("value", snapshot => {
      let items = snapshot.val();
      var x = 0;
      let orders = Object.keys(items).map(i => items[i]);
      console.log(orders);
    
      this.setState({
        orders: orders
      })


      console.log(this.state.orders);
    });

   
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
            console.log('item MAP', item);
            return (
              <div className="card m-3">
                <div className="card-header text-center table-card-orders">
                  ZAMOWIENIE:{item.TIMESTAMP}
                </div>
                <div className="card-body">
                  <table className="table table-bordered">
                    <thead className="thead-light" />
                    <tbody>
                      <tr>
                        <th scope="row">Imie:</th>
                        <td>{item.DANE_KLIENTA.name}</td>
                        <th>Numer domu:</th>
                        <td>{item.DANE_KLIENTA.houseNumber}</td>
                      </tr>
                      <tr>
                        <th scope="row">Numer id:</th>
                        <td>{item.DANE_KLIENTA.idNumber}</td>
                        <th>Ulica:</th>
                        <td>{item.DANE_KLIENTA.street}</td>
                      </tr>
                      <tr>
                        <th scope="row">Imie sponosora:</th>
                        <td>{item.DANE_KLIENTA.sponsorName}</td>
                        <th>Miasto:</th>
                        <td>{item.DANE_KLIENTA.city}</td>
                      </tr>
                      <tr>
                        <th scope="row">Id sponosora:</th>
                        <td>{item.DANE_KLIENTA.idSponsor}</td>
                        <th>Kod pocztowy:</th>
                        <td>{item.DANE_KLIENTA.postCode}</td>
                      </tr>
                      <tr>
                        <th scope="row">E-mail:</th>
                        <td>{item.DANE_KLIENTA.email}</td>
                        <th>Nr tel.:</th>
                        <td>{item.DANE_KLIENTA.phone}</td>
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
                      {item.ZAMOWIENIE.map((row, i) => {
                        console.log('row',row);

                      return(
                        <tr>
                            <th scope="row">{i + 1}</th>
                            <td> {row.A}</td>
                            <td> ilosc </td>
                            <td> {row.B}</td>
                            <td> {row.C} </td>
                            <td> {row.D} </td>
                            <td> {row.E}</td>
                        </tr>
                      )
                        
                      })}
                      <tr>
                        <th scope="row">1</th>
                        <td>{item.A}</td>
                        <td>ilosc</td>
                        <td>{item.B}</td>
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
