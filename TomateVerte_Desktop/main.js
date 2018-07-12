const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain} = electron;
var dbTools = require('./dbFunctions');

//set environment 
//process.env.NODE_ENV = 'production';

let mainWindow;
let paramWindow;

//listen for app to be ready
app.on('ready', function(){
    //Create a new window
    mainWindow = new BrowserWindow({});
    //load hml in the mainWindow
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol:'file:',
        slashes: true
    }));
    //Quit app when closed
    mainWindow.on('close', function(){
        app.quit();
    });

    //Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //insert menu
    Menu.setApplicationMenu(mainMenu);
});


//handle createParamWindow
function createParamWindow() {
    //Create a new window
    paramWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Paramétrage'
    });
    //load hml in the mainWindow
    paramWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'paramWindow.html'),
        protocol:'file:',
        slashes: true
    }));
    //garbage collection handle
    paramWindow.on('close', function(){
        paramWindow = null;
    });
};

//catch param: add
ipcMain.on('ipRaspberry:update', function(e, paramValue){
    dbTools.setParam('ipRaspberry', paramValue);
    // mainWindow.webContents.send('ipRaspberry:update', paramValue);
    paramWindow.close();
});



//create menu template
const mainMenuTemplate = [
    {
        label:'Fichier',
        submenu:[
            {
                label: 'Paramétrer',
                click(){
                    createParamWindow()
                }
            },
            {
                label: 'Fermer',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

//if MAC, add empty object to menu
if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

//Add develoopper tools item if not in prod
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: 'Developper Tools',
        submenu:[
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
            }
        },
        {
            role: 'reload'
        }
        ]
    })
}