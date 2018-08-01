import React, { Component } from "react";
import fire from "../../config/Fire";

class Home extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {
      client: [],
      orders: [],
      info: []
    };
  }

  componentDidMount() {
    const itemsRef = fire.database().ref("orders");
    itemsRef.on("value", snapshot => {
      let items = snapshot.val();
      var x = 0;
      //console.log("-------------");
      //console.log(items);
      let orders = [];
      let order = {};
      let client = [];
      let info = [];
      var date = [];
      for (let item in items) {
        for (let inside in items[item]) {
          //console.log(inside);
          if (inside === "DANE_KLIENTA") {
            //console.log(items[item][inside].name);
            client.push({
              name: items[item][inside].name,
              idNumber: items[item][inside].idNumber,
              sponsorName: items[item][inside].sponsorName,
              idSponsor: items[item][inside].idSponsor,
              email: items[item][inside].email
            });
          }

          if (inside === "TIMESTAMP") {
            info.push({
              timestamp: items[item][inside]
            });
          }

          if (inside === "ZAMOWIENIE") {
            for (let quantity in items[item][inside]) {
              for (let products in items[item][inside][quantity]) {
                //console.log(items[item][inside][quantity].A);
                orders.push({
                  A: items[item][inside][quantity].A,
                  B: items[item][inside][quantity].B,
                  C: items[item][inside][quantity].C,
                  D: items[item][inside][quantity].D,
                  E: items[item][inside][quantity].E
                });

                //console.log(items[item][inside][quantity][products]);
              }
            }
          }

          //console.log("ttututuututututu");
          // if (inside === "TIMESTAMP") {
          //   //console.log("timestamp");
          //   //order.timestamp = items[item][inside];
          //   order.timestamp = items[item][inside];
          // }

          //order.name =

          // if (inside === "DANE_KLIENTA") {
          //   for (let i in items[item][inside]) {
          //     //console.log(items[item][inside][i]);
          //     // console.log(i);
          //     //console.log("iiiiiiii");
          //     //client.push({});
          //     //order[i] = items[item][inside][i];
          //     // console.log(order[i]);
          //     // console.log("________");
          //   }
          // }
          // if (inside === "ZAMOWIENIE") {
          //   for (let i in items[item][inside]) {
          //     //console.log(items[item][inside][i]);
          //     // console.log(i);
          //     for (let product in items[item][inside][i]) {
          //       order[product] = items[item][inside][i][product];
          //     }
          //     // console.log("iiiiiiii");
          //     //order[i] = items[item][inside][i];
          //     // console.log(order[i]);
          //     // console.log("________");
          //   }
          // }
        }
      }
      this.setState({
        client: client
      });
      this.setState({
        info: info
      });
      this.setState({
        orders: orders
      });

      console.log(client);
      console.log(info);
      console.log(orders);
      // orders.push(order);

      //console.log(this.state.orders);
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

          {this.state.client.map(item => {
            return (
              <div className="card m-3">
                <div className="card-header text-center table-card-orders">
                  {this.state.info.map(info => {
                    return <div>ZAMOWIENIE:{info.timestamp}</div>;
                  })}
                </div>
                <div className="card-body">
                  <table className="table table-bordered">
                    <thead className="thead-light" />
                    <tbody>
                      <tr>
                        <th scope="row">Imie:</th>
                        <td>{item.name}</td>
                        <th>Numer domu:</th>
                        <td>{item.houseNumber}</td>
                      </tr>
                      <tr>
                        <th scope="row">Numer id:</th>
                        <td>{item.idNumber}</td>
                        <th>Ulica:</th>
                        <td>{item.street}</td>
                      </tr>
                      <tr>
                        <th scope="row">Imie sponosora:</th>
                        <td>{item.sponsorName}</td>
                        <th>Miasto:</th>
                        <td>{item.city}</td>
                      </tr>
                      <tr>
                        <th scope="row">Id sponosora:</th>
                        <td>{item.idSponsor}</td>
                        <th>Kod pocztowy:</th>
                        <td>{item.postCode}</td>
                      </tr>
                      <tr>
                        <th scope="row">E-mail:</th>
                        <td>{item.email}</td>
                        <th>Nr tel.:</th>
                        <td>{item.phone}</td>
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
                      {this.state.orders.map(product => {
                        return (
                          <tr>
                            <th scope="row">1</th>
                            <td>{product.A}</td>
                            <td>{product.B}</td>
                            <td>{product.C}</td>
                            <td>{product.D}</td>
                            <td>{product.E}</td>
                          </tr>
                        );
                      })}
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
