import React, { Component } from "react";
import Logout from "../Logout/Logout";
import OrderTable from "../OrderTable/OrderTable";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // showOrder: this.props.showOrder
    };
  }
  searchingFor(filteredState) {
    return function(x) {
      return (
        x.DANE_KLIENTA.name
          .toLowerCase()
          .includes(filteredState.toLowerCase()) ||
        x.DANE_KLIENTA.idNumber
          .toLowerCase()
          .includes(filteredState.toLowerCase())
      );
    };
  }

  render() {
    return (
      <div>
        {this.props.orders
          .filter(this.searchingFor(this.props.filteredState))
          .map((item, i) => {
            let timeStamp = item.TIMESTAMP.slice(0, 10);

            return (
              <div key={i} className="card m-3 ">
                <Logout />
                <div
                  className={`card-header text-white text-center table-card-orders text-white ${
                    item.DANE_KLIENTA.idSponsor ? "is-Distributor" : ""
                  }`}
                >
                  {this.props.showOrder[i] ? (
                    <div
                      className="circle white"
                      onClick={e => {
                        this.props.showOrderContent(item, e);
                      }}
                    >
                      -
                    </div>
                  ) : (
                    <div
                      className="circle white"
                      onClick={e => {
                        this.props.showOrderContent(item, e);
                      }}
                    >
                      +
                    </div>
                  )}
                  ZAMOWIENIE: {timeStamp + this.props.showOrder[i]}
                  <div className="check white">
                    <input
                      checked={this.props.OrderChecked[i]}
                      type="checkbox"
                      onChange={e => {
                        this.props.handleCheck(item, e);
                      }}
                      // className="form-check-input"
                    />
                  </div>
                </div>

                <div
                  className={`card-body ${
                    this.props.showOrder[i] ? "" : "hide"
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
                  {/* <ClientDetailsTable/> */}
                  {/* <OrderTable item={this.props.orders} /> */}

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

                    {this.props.orders[i].ZAMOWIENIE.map((y, lineNumber) => {
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
      </div>
    );
  }
}

export default Order;
