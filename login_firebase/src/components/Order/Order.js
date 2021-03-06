import React, { Component } from "react";

class Order extends Component {
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
        {this.props.orders.map((item, i) => {
          let timeStamp = item.TIMESTAMP.slice(0, 10);
          let distributor = "";
          let distributorPrice = "Cena Katalogowa";
          let signOfOrder = "+";
          if (item.DANE_KLIENTA.idSponsor) {
            distributor = "is-Distributor";
          }

          if (item.DANE_KLIENTA.idSponsor) {
            distributorPrice = "Cena Dystrybutora";
          }

          if (this.props.showOrder[i]) {
            signOfOrder = "-";
          }
          return (
            <div key={i} className="card m-3 minimum-width">
              <div
                className={this.props.displayOrder[i] ? "" : "DontDisplayOrder"}
              >
                <div
                  className={`card-header text-white text-center table-card-orders text-white  ${distributor}`}
                >
                  <div
                    className="circle white"
                    onClick={e => {
                      this.props.showOrderContent(item, e);
                    }}
                  >
                    {signOfOrder}
                  </div>
                  ZAMOWIENIE: {timeStamp}
                  <div className="check white">
                    <input
                      checked={this.props.OrderChecked[i]}
                      type="checkbox"
                      onChange={e => {
                        this.props.handleCheck(item, e);
                      }}
                    />
                  </div>
                </div>

                <div
                  className={`card-body  ${
                    this.props.showOrder[i] ? "" : "hide"
                  }`}
                >
                  <table className="table-sm table-bordered mb-3  m-auto">
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

                  <table className="table-sm table-bordered m-auto mt-3">
                    <thead className="thead-light white-text">
                      <tr className="white-text">
                        <th
                          className={`table-header-orders ${distributor}`}
                          scope="col"
                        >
                          Lp:
                        </th>
                        <th
                          className={`table-header-orders  ${distributor}`}
                          scope="col"
                        >
                          Numer Produktu
                        </th>
                        <th
                          className={`table-header-orders ${distributor}`}
                          scope="col"
                        >
                          Ilość
                        </th>
                        <th
                          className={`table-header-orders ${distributor}`}
                          scope="col"
                        >
                          Nazwa Produktu
                        </th>
                        <th
                          className={`table-header-orders ${distributor}`}
                          scope="col"
                        >
                          Punkty
                        </th>
                        <th
                          className={`table-header-orders ${distributor}`}
                          scope="col"
                        >
                          {distributorPrice}
                        </th>
                        ;
                      </tr>
                    </thead>

                    {this.props.orders[i].ZAMOWIENIE.map((y, lineNumber) => {
                      lineNumber++;
                      let price = y.C;

                      if (item.DANE_KLIENTA.sponsorName) {
                        price = y.D;
                      }

                      return (
                        <tbody key={lineNumber}>
                          <tr>
                            <th scope="row">{lineNumber}</th>
                            <td>{y.A}</td>
                            <td>{y.Q}</td>
                            <td>{y.B}</td>
                            <td>{y.E}</td>
                            <td>{price}</td>
                          </tr>
                        </tbody>
                      );
                    })}
                  </table>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Order;
