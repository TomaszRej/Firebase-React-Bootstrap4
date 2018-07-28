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
    const itemsRef2 = fire.database().ref("orders/ZAMOWIENIE");

    for (var x in itemsRef2) {
      if (itemsRef2[x].key === "ZAMOWIENIE") {
        console.log(itemsRef2[x].key);
        console.log(itemsRef2[x].child("A").key);
        //for (let order in itemsRef2) {
        //  console.log(order);
        // }
      }
    }

    const itemsRef = fire.database().ref("orders");
    itemsRef.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
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
      this.setState({
        orders: newState
      });
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
        <div className="container-flow d-flex">
          <button
            onClick={this.logout}
            className="btn btn-success btn-lg btn-block w-25  align-self-center"
          >
            Logout
          </button>
          <h1 className="title align-self-center text-center text-white display-4 mb-4">
            TIANDE
          </h1>
        </div>

        <div>
          <section>
            <div>
              {this.state.orders.map(item => {
                return (
                  <div className="d-flex all-orders">
                    <div className="main-block m-4">
                      <div className="wrapper-client text-white" key={item.id}>
                        <div className="title text-center">DANE KLIENTA</div>
                        <div className="test col  ml-auto">
                          <div className="row mt-2">
                            <p className="mr-auto">NAME: {item.name}</p>
                            <p>HOUSE NUMBER: {item.houseNumber}</p>
                          </div>
                          <div className="row mt-2 ">
                            <p className="mr-auto">
                              ID NUMBER: {item.idNumber}
                            </p>
                            <p className="ml-3">STREET: {item.street}</p>
                          </div>
                          <div className="row mt-2 ">
                            <p className="mr-auto">
                              SPONSOR NAME: {item.sponsorName}
                            </p>
                            <p className="ml-3">CITY: {item.city}</p>
                          </div>
                          <div className="row mt-2 ">
                            <p className="mr-auto">
                              IDSPONSOR: {item.idSponsor}
                            </p>
                            <p className="ml-3">POST CODE: {item.postCode}</p>
                          </div>
                          <div className="row mt-2 ">
                            <p className="mr-auto">EMAIL: {item.email}</p>
                            <p className="ml-3">PHONE: {item.phone}</p>
                          </div>
                        </div>
                      </div>
                      <div className="wrapper-order">
                        <div className="title text-center">ZAMOWIENIE</div>
                        <p>zam1: {item.zam1}</p>
                        <p>zam1.B {item.zam2}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    );
  }
}
export default Home;
