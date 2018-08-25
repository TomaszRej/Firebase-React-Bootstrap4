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
    this.countOrdersToDelete = this.countOrdersToDelete.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.clearSearchHandler = this.clearSearchHandler.bind(this);
    this.state = {
      orders: [],
      tempOrders: [],
      filteredState: "",
      empty: "Wyszukaj",
      clearSearch: false,
      searchValue: "",
      howManyToDelete: 0,
      OrderChecked: [],
      tempOrderChecked: [],
      showOrder: []
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

      let OrderChecked = [...this.state.OrderChecked];
      let showOrder = [...this.state.showOrder];

      for (let orderId in orders) {
        OrderChecked[orderId] = false;
        showOrder[orderId] = false;
      }

      this.setState({
        tempOrders: [...orders],
        tempOrderChecked: [OrderChecked],
        showOrder: [...showOrder],
        OrderChecked: [...OrderChecked],
        orders: [...orders]
      });
    });
  }

  showOrderContent(item, i) {
    let showOrder = [...this.state.showOrder];
    const orderIndex = this.state.orders.findIndex(o => {
      return o.id === item.id;
    });

    showOrder[orderIndex] = !showOrder[orderIndex];
    for (let orderId in this.state.orders) {
      showOrder[orderId] = showOrder[orderId];
    }
    this.setState({
      showOrder: showOrder
    });

    // let showOrder = [];
    // //odmutowane do 59
    // for (let orderId in this.state.orders) {
    //   //console.log(orderId);
    //   if (showOrder[orderId] === undefined) {
    //     showOrder[orderId] = false;
    //   } else {
    //     showOrder[orderId] = showOrder[orderId];
    //   }
    // }

    // for (let orderId in this.state.orders) {
    //   // dla wszystkich zamowien
    //   if (showOrder[orderId] === undefined) {
    //     showOrder[orderId] = false;
    //   }
    //   // console.log(this.state.orders[orderId]);
    //   if (item.id === this.state.orders[orderId].id) {
    //     showOrder[orderId] = !this.state.showOrder[orderId];
    //   } else {
    //     showOrder[orderId] = this.state.showOrder[orderId];
    //   }
    // }

    // // bug when searched cant show or hide order with +
    // // prawdopodobnie trzeba bedzie potem zminic zeby tworzylo
    // //nowy state tablice z przefiltrowanymi recordami zeby + - otwieral oddzielnie
    // if (this.state.filteredState) {
    //   for (let orderId in this.state.orders) {
    //     showOrder[orderId] = !this.state.showOrder[orderId];
    //   }

    //   console.log(this.state.filteredState);
    //   console.log("filtered STATE");
    // }

    // this.setState({
    //   showOrder: [...showOrder]
    // });

    // console.log(this.state.showOrder);
    // console.log("SHOW ORDER CONTENT");
    // console.log(item.id);
  }

  handleCheck(item, e) {
    let OrderChecked = [...this.state.OrderChecked];
    let tempOrderChecked = [...this.state.tempOrderChecked];
    let temp = e.target.checked;
    const orderIndex = this.state.orders.findIndex(o => {
      return o.id === item.id;
    });

    const tempOrderIndex = this.state.tempOrders.findIndex(o => {
      return o.id === item.id;
    });
    OrderChecked[orderIndex] = temp;
    for (let orderId in this.state.orders) {
      OrderChecked[orderId] = OrderChecked[orderId];
    }

    if (this.state.clearSearch) {
      tempOrderChecked[tempOrderIndex] = temp;
      for (let i in this.state.tempOrders) {
        tempOrderChecked[i] = tempOrderChecked[i];
      }
    }

    this.setState({
      tempOrderChecked: [...tempOrderChecked],
      OrderChecked: [...OrderChecked]
    });
    console.log(this.state.tempOrderChecked);
  }

  invertAll() {
    let OrderChecked = [...this.state.OrderChecked];
    let tempOrderChecked = [...this.state.tempOrderChecked];
    for (let order in OrderChecked) {
      OrderChecked[order] = !this.state.OrderChecked[order];
    }
    for (let i in tempOrderChecked) {
      tempOrderChecked[i] = !this.state.tempOrderChecked[i];
    }

    this.setState({
      tempOrderChecked: [...tempOrderChecked],
      OrderChecked: [...OrderChecked]
    });
  }
  countOrdersToDelete() {
    let count = 0;
    let OrderChecked = [...this.state.OrderChecked];
    let orders = [...this.state.orders];
    for (let order in OrderChecked) {
      if (OrderChecked[order] === true) {
        count++;
      }
    }
    this.setState({
      howManyToDelete: count
    });
  }

  delete() {
    // w delete obliczac ile do usuniecia

    let count = 0;
    let OrderChecked = [...this.state.OrderChecked];
    let orders = [...this.state.orders];
    for (let order in orders) {
      if (OrderChecked[order] === true) {
        count++;
        const itemRef = fire.database().ref(`/orders/${orders[order].id}`);
        //itemRef.remove();
      }
    }
  }

  search(e) {
    let filteredState = [...this.state.filteredState];
    let orders = [...this.state.orders];
    filteredState = e.target.value;
    //??
    // if (this.state.filteredState === "") {
    //   clearSearch = !this.state.clearSearch;
    //   console.log("empty");
    //   for (let order in this.state.orders) {
    //     orders[order] = this.state.orders[order];
    //   }
    // }
    this.setState({
      orders: orders,
      filteredState: filteredState
    });
  }
  clearSearchHandler() {
    //console.log(this.state.OrderChecked);

    let orders = [...this.state.tempOrders];
    let OrderChecked = [...this.state.tempOrderChecked];

    for (let i in this.state.orders) {
      if (this.state.orders[i] !== this.state.tempOrders[i]) {
        orders[i] = this.state.tempOrders[i];
      } else {
      }
      if (this.state.OrderChecked[i] !== this.state.tempOrderChecked[i]) {
        OrderChecked[i] = this.state.tempOrderChecked[i];
      } else {
        OrderChecked[i] = this.state.OrderChecked[i];
      }
    }

    this.setState({
      clearSearch: !this.state.clearSearch,
      orders: orders,
      OrderChecked: OrderChecked
    });
  }

  handleSearch() {
    let tempOrders = [...this.state.tempOrders];
    let tempOrderChecked = [...this.state.tempOrderChecked];
    let orders = [...this.state.orders];
    let OrderChecked = [...this.state.OrderChecked];
    if (this.state.filteredState) {
      for (let i in this.state.orders) {
        if (
          this.state.orders[i].DANE_KLIENTA.name.indexOf(
            this.state.filteredState
          ) !== -1 ||
          this.state.orders[i].DANE_KLIENTA.idNumber.indexOf(
            this.state.filteredState
          ) !== -1
        ) {
          //console.log(this.state.orders[i].id);

          orders[0] = this.state.orders[i];
          orders[i] = this.state.orders[0];
          OrderChecked[0] = this.state.OrderChecked[i];
          OrderChecked[i] = this.state.OrderChecked[0];

          tempOrders[0] = this.state.orders[0];
          tempOrders[i] = this.state.orders[i];
          tempOrderChecked[0] = this.state.OrderChecked[0];
          tempOrderChecked[i] = this.state.OrderChecked[i];
        } else {
          tempOrders[i] = orders[i];
          tempOrderChecked[i] = OrderChecked[i];
        }
      }

      this.setState({
        tempOrders: tempOrders,
        tempOrderChecked: tempOrderChecked,
        clearSearch: !this.state.clearSearch,
        OrderChecked: OrderChecked,
        orders: orders
      });
      //console.log("handkeseart");
      //console.log(this.state.searchValue);
    }
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
              clearSearch={this.state.clearSearch}
              invertAll={this.invertAll}
              delete={this.delete}
              howManyToDelete={this.state.howManyToDelete}
              countOrdersToDelete={this.countOrdersToDelete}
              handleSearch={this.handleSearch}
              clearSearchHandler={this.clearSearchHandler}
              empty={this.state.empty}
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
              searchValue={this.state.searchValue}
            />
          </section>
        </main>
      </div>
    );
  }
}
export default Home;
