const logoutButton = new LogoutButton;

logoutButton.action = () => ApiConnector.logout(function(response){
    if (response["success"]) {
        location.reload();
        return;
    }
});

ApiConnector.current(function(response){
    if (response["success"]) {
        ProfileWidget.showProfile(response["data"]);
        return;
    }
});

const ratesBoard = new RatesBoard;

let getCurrentStocks = function() {
    ApiConnector.getStocks(function(response){  
        if (response["success"]) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response["data"]);
            return;
        }
    });
}

getCurrentStocks();

setInterval(() => {
    getCurrentStocks();
}, 60000);

const moneyManager = new MoneyManager;
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        let message;
        if (response["success"]) {
            ProfileWidget.showProfile(response["data"]);
            message = "Операция выполнена";
        } else {
            message = response["error"];
        }
        moneyManager.setMessage(response["success"], message);
    });
};

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        let message;
        if (response["success"]) {
            ProfileWidget.showProfile(response["data"]);
            message = "Операция выполнена";
        } else {
            message = response["error"];
        }
        moneyManager.setMessage(response["success"], message);
    });
};

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        let message;
        if (response["success"]) {
            ProfileWidget.showProfile(response["data"]);
            message = "Операция выполнена";
        } else {
            message = response["error"];
        }
        moneyManager.setMessage(response["success"], message);
    });
};


const favoritesWidget = new FavoritesWidget;
  ApiConnector.getFavorites((response) => {
    if (response["success"]) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response["data"]);
        moneyManager.updateUsersList(response["data"]);
    }
  });


favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        let message;
        if (response["success"]) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response["data"]);
            moneyManager.updateUsersList(response["data"]);
            message = "Операция выполнена";
        } else {
            message = response["error"];
        }
        moneyManager.setMessage(response["success"], message);
    });
};

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        let message;
        if (response["success"]) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response["data"]);
            moneyManager.updateUsersList(response["data"]);
            message = "Операция выполнена";
        } else {
            message = response["error"];
        }
        moneyManager.setMessage(response["success"], message);
    });
};