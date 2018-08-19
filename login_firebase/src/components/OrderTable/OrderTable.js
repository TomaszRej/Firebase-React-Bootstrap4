import React, { Component } from "react";

class OrderTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <table className="table-sm table-bordered">
          <thead className="thead-light white-text">
            <tr className="white-text">
              <th
                className={`table-header-orders ${
                  this.props.item.DANE_KLIENTA.idSponsor
                    ? "is-Distributor-light"
                    : ""
                }`}
                scope="col"
              >
                Lp:
              </th>
              <th
                className={`table-header-orders  ${
                  this.props.item.DANE_KLIENTA.idSponsor
                    ? "is-Distributor-light"
                    : ""
                }`}
                scope="col"
              >
                Numer Produktu
              </th>
              <th
                className={`table-header-orders ${
                  this.props.item.DANE_KLIENTA.idSponsor
                    ? "is-Distributor-light"
                    : ""
                }`}
                scope="col"
              >
                Ilość
              </th>
              <th
                className={`table-header-orders ${
                  this.props.item.DANE_KLIENTA.idSponsor
                    ? "is-Distributor-light"
                    : ""
                }`}
                scope="col"
              >
                Nazwa Produktu
              </th>
              <th
                className={`table-header-orders ${
                  this.props.item.DANE_KLIENTA.idSponsor
                    ? "is-Distributor-light"
                    : ""
                }`}
                scope="col"
              >
                Punkty
              </th>
              {this.props.item.DANE_KLIENTA.idSponsor ? (
                <th
                  className={`table-header-orders ${
                    this.props.item.DANE_KLIENTA.idSponsor
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
                    this.props.item.DANE_KLIENTA.idSponsor
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

          {this.state.orders[0].ZAMOWIENIE.map((y, lineNumber) => {
            lineNumber++;
            return (
              <tbody key={lineNumber}>
                <tr>
                  <th scope="row">{lineNumber}</th>
                  <td>{y.A}</td>
                  <td>{y.Q}</td>
                  <td>{y.B}</td>
                  <td>{y.E}</td>
                  {this.props.item.DANE_KLIENTA.sponsorName ? (
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
    );
  }
}

export default OrderTable;
