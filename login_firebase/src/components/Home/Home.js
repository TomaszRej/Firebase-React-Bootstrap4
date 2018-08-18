import React, { Component } from "react";
// import TransitionGroup from "react-transition-group/TransitionGroup";
// import CSSTransition from "react-transition-group/CSSTransition";
// import Transition from "react-transition-group/Transition";
import fire from "../../config/Fire";
import Logout from "../Logout/Logout";
import MiniMenu from "../MiniMenu/MiniMenu";
import Order from "../Order/Order";

class Home extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.search = this.search.bind(this);
    this.delete = this.delete.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.invertAll = this.invertAll.bind(this);
    this.showOrderContent = this.showOrderContent.bind(this);

    this.state = {
      orders: [],
      filteredState: "",
      howManyToDelete: 0,
      OrderChecked: [],
      showOrder: [false]
    };
  }

  componentDidMount() {
    const itemsRef = fire.database().ref("orders");

    itemsRef.on("value", snapshot => {
      let items = snapshot.val();
      let orders = [];
      for (let item in items) {
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

  showOrderContent(item, i) {
    let showOrder = [];
    // for (let orderId in this.state.orders) {
    //   console.log(orderId);
    //   if (showOrder[orderId] === undefined) {
    //     showOrder[orderId] = false;
    //   } else {
    //     showOrder[orderId] = showOrder[orderId];
    //   }
    // }

    for (let orderId in this.state.orders) {
      // dla wszystkich zamowien
      if (showOrder[orderId] === undefined) {
        showOrder[orderId] = false;
      }
      console.log(this.state.orders[orderId]);
      if (item.id === this.state.orders[orderId].id) {
        showOrder[orderId] = !this.state.showOrder[orderId];
      } else {
        showOrder[orderId] = this.state.showOrder[orderId];
      }
    }

    // bug when searched cant show or hide order with +
    if (true) {
    }

    this.setState({
      showOrder: showOrder
    });

    console.log(this.state.showOrder);
    console.log("SHOWORDER");
  }

  handleCheck(item, e) {
    let howManyToDelete = 0;
    let OrderChecked = this.state.OrderChecked;
    //OrderChecked[item.id] = e.target.checked;
    let temp = e.target.checked;
    //console.log(item.id + "+" + OrderChecked[item.id]);
    for (let orderId in this.state.orders) {
      OrderChecked[orderId] = this.state.OrderChecked[orderId];
      if (this.state.OrderChecked[orderId] === undefined) {
        OrderChecked[orderId] = false;
      }
      if (item.id === this.state.orders[orderId].id) {
        OrderChecked[orderId] = temp;
      }
      if (OrderChecked[orderId] === true) {
        howManyToDelete++;
      }
    }

    this.setState({
      OrderChecked: OrderChecked,
      howManyToDelete: howManyToDelete
    });
  }

  invertAll() {
    let howManyToDelete = 0;
    let OrderChecked = this.state.OrderChecked;
    let orders = this.state.orders;
    for (let order in orders) {
      OrderChecked[order] = !this.state.OrderChecked[order];
      console.log(OrderChecked[order]);
      if (OrderChecked[order] === true) {
        howManyToDelete++;
      }
      //console.log(orders[order].id);
    }

    this.setState({
      OrderChecked: OrderChecked,
      howManyToDelete: howManyToDelete
    });
  }

  delete() {
    let count = 0;
    let OrderChecked = this.state.OrderChecked;
    let orders = this.state.orders;
    for (let order in orders) {
      if (OrderChecked[order] === true) {
        count++;
        const itemRef = fire.database().ref(`/orders/${orders[order].id}`);
        //itemRef.remove();
      }
    }

    this.setState({
      howManyToDelete: count
    });
    console.log(count);
  }

  search(e) {
    this.setState({ filteredState: e.target.value });
  }

  logout() {
    fire.auth().signOut();
  }

  render() {
    const animationTiming = {
      enter: 500,
      exit: 1500
    };
    return (
      <div>
        <main className="container mt-3">
          <section id="header">
            <Logout logout={this.logout} />
            <MiniMenu
              search={this.search}
              invertAll={this.invertAll}
              delete={this.delete}
              howManyToDelete={this.state.howManyToDelete}
            />
          </section>
          <section>
            <Order
              filteredState={this.state.filteredState}
              showOrderContent={this.showOrderContent}
              orders={this.state.orders}
              showOrder={this.state.showOrder}
              OrderChecked={this.state.OrderChecked}
              handleCheck={this.handleCheck}
            />
          </section>

          {/* {this.state.orders
            .filter(searchingFor(this.state.filteredState))
            .map((item, i) => {
              let timeStamp = item.TIMESTAMP.slice(0, 10);

              return (
                <div key={i} className="card m-3 ">
                  <div
                    className={`card-header text-white text-center table-card-orders text-white ${
                      item.DANE_KLIENTA.idSponsor ? "is-Distributor" : ""
                    }`}
                  >
                    {this.state.showOrder[i] ? (
                      <div
                        className="circle white"
                        onClick={e => {
                          this.showOrderContent(item, e);
                        }}
                      >
                        -
                      </div>
                    ) : (
                      <div
                        className="circle white"
                        onClick={e => {
                          this.showOrderContent(item, e);
                        }}
                      >
                        +
                      </div>
                    )}
                    {this.state.showOrder[i]}
                    ZAMOWIENIE: {timeStamp}
                    <div className="check white">
                      <input
                        checked={this.state.OrderChecked[i]}
                        type="checkbox"
                        onChange={e => {
                          this.handleCheck(item, e);
                        }}
                        className="form-check-input"
                      />
                    </div>
                  </div>

                  <div
                    className={`card-body ${
                      this.state.showOrder[i] ? "" : "hide"
                    }`}
                  >
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
                      <thead className="thead-light white-text">
                        <tr className="white-text">
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
                            className={`table-header-orders  ${
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
            })} */}
        </main>
      </div>
    );
  }
}
export default Home;
