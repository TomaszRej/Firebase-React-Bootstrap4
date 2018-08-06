import React, { Component } from "react";
import fire from "../../config/Fire";

class Home extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      orders: []
    };
  }

  componentDidMount() {
    const itemsRef = fire.database().ref("orders");
    itemsRef.on("value", snapshot => {
      let items = snapshot.val();
      let orders = Object.keys(items).map(i => items[i]);

      this.setState({
        orders: orders
      });
    });
  }

  search(e) {
    let input = e.target.value;

    console.log(input);
    let filteredOrders = [];
    filteredOrders = this.state.orders.slice();
    let temp = filteredOrders.filter(i => {
      return i.DANE_KLIENTA.name === input;
    });

    console.log(temp);
    console.log("temp w gore temp");

    this.setState({ orders: temp });
  }

  logout() {
    fire.auth().signOut();
  }

  render() {
    return (
      <div>
        <main className="container">
          <section className="d-flex mt-3">
            <button
              onClick={this.logout}
              className="btn btn-success btn-lg m-auto"
            >
              Logout
            </button>
            <div className="w-75 m-auto">
              <input
                onChange={this.search}
                type="text"
                className="form-control-lg"
                placeholder="Wyszukaj"
              />
            </div>
          </section>
          {this.state.orders.map((item, i) => {
            let timeStamp = item.TIMESTAMP.slice(0, 10);

            return (
              <div key={i} className="card m-3">
                <div
                  className={`card-header text-center table-card-orders ${
                    item.DANE_KLIENTA.idSponsor ? "is-Distributor" : ""
                  }`}
                >
                  ZAMOWIENIE: {timeStamp}
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
                        <th
                          className={`table-header-orders ${
                            item.DANE_KLIENTA.idSponsor
                              ? "is-Distributor-light"
                              : ""
                          }`}
                          scope="col"
                        >
                          Lp:
                        </th>
                        <th
                          className={`table-header-orders ${
                            item.DANE_KLIENTA.idSponsor
                              ? "is-Distributor-light"
                              : ""
                          }`}
                          scope="col"
                        >
                          Numer Produktu
                        </th>
                        <th
                          className={`table-header-orders ${
                            item.DANE_KLIENTA.idSponsor
                              ? "is-Distributor-light"
                              : ""
                          }`}
                          scope="col"
                        >
                          Ilość
                        </th>
                        <th
                          className={`table-header-orders ${
                            item.DANE_KLIENTA.idSponsor
                              ? "is-Distributor-light"
                              : ""
                          }`}
                          scope="col"
                        >
                          Nazwa Produktu
                        </th>
                        <th
                          className={`table-header-orders ${
                            item.DANE_KLIENTA.idSponsor
                              ? "is-Distributor-light"
                              : ""
                          }`}
                          scope="col"
                        >
                          Punkty
                        </th>
                        {item.DANE_KLIENTA.idSponsor ? (
                          <th
                            className={`table-header-orders ${
                              item.DANE_KLIENTA.idSponsor
                                ? "is-Distributor-light"
                                : ""
                            }`}
                            scope="col"
                          >
                            Cena Dystrybutora
                          </th>
                        ) : (
                          <th
                            className={`table-header-orders ${
                              item.DANE_KLIENTA.idSponsor
                                ? "is-Distributor-light"
                                : ""
                            }`}
                            scope="col"
                          >
                            Cena Katalogowa
                          </th>
                        )}
                      </tr>
                    </thead>

                    {this.state.orders[i].ZAMOWIENIE.map((y, lineNumber) => {
                      lineNumber++;
                      return (
                        <tbody key={lineNumber}>
                          <tr>
                            <th scope="row">{lineNumber}</th>
                            <td>{y.A}</td>
                            <td>{y.Q}</td>
                            <td>{y.B}</td>
                            <td>{y.E}</td>
                            {item.DANE_KLIENTA.sponsorName ? (
                              <td>{y.D}</td>
                            ) : (
                              <td>{y.C}</td>
                            )}
                          </tr>
                        </tbody>
                      );
                    })}
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
