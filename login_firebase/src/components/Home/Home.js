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

    this.state = {
      orders: [],
      filteredState: "",
      howManyToDelete: 0,
      OrderChecked: [],
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
    let temp = e.target.checked;
    const orderIndex = this.state.orders.findIndex(o => {
      return o.id === item.id;
    });

    OrderChecked[orderIndex] = temp;

    for (let orderId in this.state.orders) {
      OrderChecked[orderId] = OrderChecked[orderId];
    }

    this.setState({
      OrderChecked: [...OrderChecked]
    });
    console.log(this.state.OrderChecked);
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
      OrderChecked: [...OrderChecked],
      howManyToDelete: howManyToDelete
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
    let showOrder = [];
    for (let orderId in this.state.orders) {
      showOrder[orderId] = this.state.orders[orderId];
    }

    this.setState({
      filteredState: e.target.value
    });
    console.log("*************");
    console.log(this.state.showOrder);
    console.log(this.state.filteredState);
    console.log("*************");
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
              countOrdersToDelete={this.countOrdersToDelete}
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
        </main>
      </div>
    );
  }
}
export default Home;
