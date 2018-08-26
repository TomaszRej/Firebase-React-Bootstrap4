import React, { Component } from "react";

class MiniMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="card m-3">
        <div class="card-body">
          <div className="d-flex flex-column">
            {this.props.clearSearch ? (
              <div className=" search">
                <button
                  className="btn btn-danger btn-lg"
                  onClick={this.props.clearSearchHandler}
                >
                  Wróć
                </button>
              </div>
            ) : (
              <div className=" search">
                <input
                  onChange={this.props.search}
                  // value={this.state.filteredState}
                  type="text"
                  className="form-control-lg"
                  placeholder={this.props.empty}
                />
                <button
                  className="btn btn-primary btn-lg"
                  onClick={this.props.handleSearch}
                >
                  Szukaj
                </button>
              </div>
            )}
            {this.props.clearSearch ? (
              ""
            ) : (
              <button
                className="btn btn-info btn-lg"
                onClick={this.props.invertAll}
              >
                Zaznacz wszystko
              </button>
            )}

            <button
              type="button"
              className="btn btn-danger btn-lg"
              data-toggle="modal"
              data-target="#exampleModal"
              onClick={this.props.countOrdersToDelete}
            >
              Skasuj zaznaczone!
            </button>
            <a
              className="btn btn-primary btn-lg"
              onClick={this.props.download}
              href="data.csv"
            >
              Eksportuj CSV
            </a>
          </div>
          <div>
            <div
              className="modal fade"
              id="exampleModal"
              tableindex="-1"
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
                    Ilość zaznaczonych zamówień:
                    {this.props.howManyToDelete}
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
                      onClick={() => this.props.delete()}
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
    );
  }
}

export default MiniMenu;
