import React, { Component } from "react";
import fire from "../../config/Fire";

function searchingFor(filteredState) {
  return function(x) {
    return (
      x.DANE_KLIENTA.name.toLowerCase().includes(filteredState.toLowerCase()) ||
      x.DANE_KLIENTA.idNumber
        .toLowerCase()
        .includes(filteredState.toLowerCase())
    );
  };
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.search = this.search.bind(this);
    this.delete = this.delete.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.checkAll = this.checkAll.bind(this);

    this.state = {
      orders: [],
      filteredState: "",
      howManyToDelete: 0,
      OrderChecked: {}
    };
  }

  componentDidMount() {
    const itemsRef = fire.database().ref("orders");
    // console.log(itemsRef.key);

    //console.log(itemsRef.child("ZAMOWIENIE").key);
    itemsRef.on("value", snapshot => {
      let items = snapshot.val();

      //var orders = Object.keys(items).map(i => items[i]);
      let orders = [];
      for (let item in items) {
        // console.log(items[item]);
        orders.push({
          id: item,
          DANE_KLIENTA: items[item].DANE_KLIENTA,
          TIMESTAMP: items[item].TIMESTAMP,
          ZAMOWIENIE: items[item].ZAMOWIENIE
        });
      }
      this.setState({
        orders: orders
      });
    });
  }

  handleCheck(item, e) {
    let OrderChecked = this.state.OrderChecked;
    OrderChecked[item.id] = e.target.checked;

    this.setState({
      OrderChecked: OrderChecked
    });

    if (OrderChecked[item.id] === true) {
      this.setState({
        howManyToDelete: this.state.howManyToDelete + 1
      });
    } else {
      this.setState({
        howManyToDelete: this.state.howManyToDelete - 1
      });
    }
  }

  checkAll() {
    let indexes = [];
    let inverted = [];
    for (let ix in this.state.orders) {
      indexes[ix] = this.state.orders[ix].id;
      inverted[ix] = !this.state.OrderChecked[indexes[ix]];
      console.log(inverted[ix]);

      //wymutowane na czas zrobienia mnodala
      // itemRef.remove();
    }

    this.setState({
      OrderChecked: inverted
    });

    console.log(inverted);
    for (let x in this.state.OrderChecked) {
      console.log(this.state.OrderChecked[x]);
      console.log("w ordered chcecked");
    }
    //console.log(this.state.OrderChecked);

    // console.log(test);
    // console.log("ZAZNACZ WSZYSTKO");
    // let opositeCheck = this.state.OrderChecked;
    // for (let x in this.state.OrderChecked) {
    //   opositeCheck[x] = !this.state.OrderChecked[x];
    // }
  }

  delete() {
    let test = 0;
    let indexes = [];
    for (let ix in this.state.orders) {
      indexes[ix] = this.state.orders[ix].id;
      if (this.state.OrderChecked[indexes[ix]] === true) {
        const itemRef = fire.database().ref(`/orders/${indexes[ix]}`);
        test++;

        //wymutowane na czas zrobienia mnodala
        // itemRef.remove();
      }
    }
    this.setState({
      howManyToDelete: test
    });

    console.log(this.state.howManyToDelete);
    console.log("ile skasowac ze state howmany");
  }

  search(e) {
    this.setState({ filteredState: e.target.value });
  }

  logout() {
    fire.auth().signOut();
  }

  render() {
    return (
      <div>
        <main className="container mt-3">
          <div id="header">
            <button onClick={this.logout} className="btn btn-success btn-lg ">
              Logout
            </button>
            <div class="card m-3">
              <div class="card-body">
                {" "}
                <div className="d-flex flex-column">
                  <input
                    onChange={this.search}
                    // value={this.state.filteredState}
                    type="text"
                    className="form-control-lg"
                    placeholder="Wyszukaj"
                  />
                  <button
                    className="btn btn-info btn-lg"
                    onClick={this.checkAll}
                  >
                    Zaznacz wszystko
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-lg"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    Skasuj zaznaczone!
                  </button>
                </div>
                <div>
                  <div
                    className="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Czy napewno chcesz skasować zaznaczone zamówienia ?
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>

                        <div className="modal-body">
                          Ilość zaznaczonych zamówień:{" "}
                          {this.state.howManyToDelete}
                        </div>

                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Anuluj
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => this.delete()}
                            data-dismiss="modal"
                          >
                            Potwierdz
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {this.state.orders
            .filter(searchingFor(this.state.filteredState))
            .map((item, i) => {
              let timeStamp = item.TIMESTAMP.slice(0, 10);
              // console.log();

              return (
                <div key={i} className="card m-3">
                  <div
                    className={`card-header text-center table-card-orders ${
                      item.DANE_KLIENTA.idSponsor ? "is-Distributor" : ""
                    }`}
                  >
                    ZAMOWIENIE: {timeStamp}{" "}
                    <div className="check">
                      <input
                        defaultChecked={this.state.inverted}
                        type="checkbox"
                        onChange={e => {
                          this.handleCheck(item, e);
                        }}
                        className="form-check-input"
                      />
                    </div>
                  </div>
                  <div className="card-body">
                    <table className="table-sm table-bordered mb-3">
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

                    <table className="table-sm table-bordered">
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
