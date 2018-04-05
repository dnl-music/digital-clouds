var React = require("react");
var connect = require("react-redux").connect;
var actions = require("./actions.jsx");

class EmployerForm extends React.Component {
  constructor(props) {
    super(props);
  }
  // Если заводить метод как стрелочную функцию, то можно обойтись без bind
  onClick = (e) => {
    // Предотвращаем стандартное поведение при отправки формы -
    // перезагрузку страницы
    e.preventDefault();
    if (this.refs.fullName.value !== ""
        && this.refs.position.value !== ""
        && this.refs.phone.value !== "") {
      const employer = {
        fullName: this.refs.fullName.value,
        position: this.refs.position.value,
        phone: this.refs.phone.value,
      }
      this.refs.fullName.value ="";
      this.refs.position.value ="";
      this.refs.phone.value ="";
      return this.props.addEmployer(employer);
    }
  }
  render() {
    // Использовать form семантически более верно 
    // и отрабатывает не только нажатие по кнопке, но и нажатие клавиши Enter
    return (
      <form onSubmit={this.onClick}>
        <label htmlFor="fullName">ФИО:</label>
        <input id="fullName" ref="fullName" />
        <br/>
        <label htmlFor="position">Должность:</label>
        <input id="position" ref="position" />
        <br/>
        <label htmlFor="phone">Телефон:</label>
        <input id="phone" ref="phone" />
        <br/>
        <button>Добавить</button>
      </form>
    );
  }
}

class EmployerItem extends React.Component {
  constructor(props) {
    super(props);
    console.log('EmployerItem props: ', this.props);
    this.state = {editMode: false, employer: this.props.employer};
  }

  switchToEdit() {
    this.setState({
      editMode: true,
    })
  }
  fullNameChanged(e) {
    console.log(e.target.value);
    this.setState({
      employer: {...this.state.employer, fullName: e.target.value}
    })
  }
  positionChanged(e) {
    console.log(e.target.value);
    this.setState({
      employer: {...this.state.employer, position: e.target.value}
    })
  }
  phoneChanged(e) {
    console.log(e.target.value);
    this.setState({
      employer: {...this.state.employer, phone: e.target.value}
    })
  }
  saveEmployer() {
    this.props.updateEmployer(this.state.employer);
    this.setState({editMode: false});
  }
  render() {

    const item = this.state.editMode ? (
      <tr>
        <td>
          <input type="text" value={this.state.employer.fullName} onChange={this.fullNameChanged.bind(this)}/>
        </td>
        <td>
          <input type="text" value={this.state.employer.position} onChange={this.positionChanged.bind(this)}/>
        </td>
        <td>
          <input type="text" value={this.state.employer.phone} onChange={this.phoneChanged.bind(this)}/>
        </td>
        <td>
          < button onClick={this.saveEmployer.bind(this)}>Сохранить</button>
        </td>
      </tr>
    ) : (
      <tr>
        <td onClick={this.switchToEdit.bind(this)}><b>{this.state.employer.fullName}</b></td>
        <td><b>{this.state.employer.position}</b></td>
        <td><b>{this.state.employer.phone}</b></td>
        <td><button onClick={() => this.props.deleteEmployer(this.state.employer.id)}>Удалить</button></td>
      </tr>
    );

    return <tbody>
            {item}
          </tbody>
  }
}

class EmployersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employers: this.props.employers,
      sorting: {
        columnName: "",
        type: 0
      },
      filter: ''
    }
  }
  componentWillReceiveProps(nextProps) {
    if(this.props != nextProps) {
      this.setState({
        employers: nextProps.employers
      });
    }
  }
  toggleSort(e) {
    console.log(e.target.innerText);
    const columnName = e.target.innerText;
    const isColumnChanged = columnName !== this.state.sorting.columnName;
    const sortingType = !isColumnChanged ? (this.state.sorting.type === 0 ? -1 : -this.state.sorting.type) : -1;
    let systemColumnName;
    switch(columnName) {
      case 'ФИО': systemColumnName = 'fullName'; break;
      case 'Должность': systemColumnName = 'position'; break;
      case 'Телефон': systemColumnName = 'phone'; break;
    }
    this.setState({
      filter: '',
      sorting: {
        columnName: e.target.innerText,
        type: sortingType
      },
      employers: this.props.employers.sort((a, b) => {
          switch(sortingType) {
            case -1:
              return a[systemColumnName].toLocaleLowerCase() < b[systemColumnName].toLocaleLowerCase();
            case 1:
              return a[systemColumnName].toLocaleLowerCase()  > b[systemColumnName].toLocaleLowerCase();
          }
        }
      )
    });
  }
  filterChange(e) {
    const val = e.target.value;
    let employers = null;

    if(val.length > 1) {
      employers = this.props.employers.filter(employer => employer.fullName.toLocaleLowerCase().indexOf(e.target.value.toLocaleLowerCase()) > -1);
    } else {
      employers = [...this.props.employers];
    }

    this.setState({
      filter: val,
      employers
    });
  }
  render() {
    return <div>
      <p>Фильтр по ФИО <input type="text" onChange={this.filterChange.bind(this)} value={this.state.filter}/></p>
      <table>
        <thead>
          <tr>
            <th onClick={this.toggleSort.bind(this)}>ФИО</th>
            <th onClick={this.toggleSort.bind(this)}>Должность</th>
            <th onClick={this.toggleSort.bind(this)}>Телефон</th><th></th>
          </tr>
        </thead>
        {this.state.employers.map(item =>
          <EmployerItem key={item.id}
                     employer={item}
                     deleteEmployer={this.props.deleteEmployer} updateEmployer={this.props.updateEmployer}/>
        )}
      </table>
    </div>
  }
};

class AppView extends React.Component {

  render() {
    console.log('AppView props: ', this.props);
    return <div>
      <EmployersList {...this.props} />
      <hr />
      <h2>Добавить сотрудника</h2>
      <EmployerForm addEmployer={this.props.addEmployer}/>
    </div>
  }
};

function mapStateToProps(state) {
  return {
    employers: [...state.employers]
  };
}

module.exports = connect(mapStateToProps, actions)(AppView);