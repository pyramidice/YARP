'use strict';
/**
 * Gamemode events
 * @memberof yarp.client
 */

yarp.client.chatShow = (toggle) => {
  mp.gui.chat.show(toggle);
};

yarp.client.toClouds = () => {
  mp.game.ui.displayRadar(false);
  mp.game.streaming.startPlayerSwitch(mp.players.local.handle, mp.players.local.handle, 513, 1);
};

yarp.client.fromClouds = (id) => {
  mp.game.ui.displayRadar(true);
  mp.game.invoke('0x95C0A5BBDC189AA1');
};

/**
 * Displays help text on top left.
 * @function displayHelpText
 * @memberof yarp.client
 * @param {String} text Text to be displayed.
 */
yarp.client.displayHelpText = (text) => {
  mp.game.ui.setTextComponentFormat('STRING');
  mp.game.ui.addTextComponentSubstringPlayerName(text);
  mp.game.ui.displayHelpTextFromStringLabel(0, false, true, -1);
};

/**
 * Clears help text on top left.
 * @function clearHelpText
 * @memberof yarp.client
 */
yarp.client.clearHelpText = () => {
  mp.game.ui.clearHelp(true);
};

/**
 * Sets the chat input state.
 * Credits to kemperrr#9752.
 * @function setWorldTime
 * @memberof yarp.client
 * @param {Boolean} active If the chat is enalbed or not.
 */
mp.gui.execute('const _enableChatInput = enableChatInput;enableChatInput = (enable) => { mp.trigger(\'yarp:cefTrigger\', \'chatEnabled\', enable); _enableChatInput(enable) };');
yarp.client.chatEnabled = (toggle) => {
  mp.gui.chat.enabled = toggle;
};

/**
 * Sets the world time in game.
 * @function setWorldTime
 * @memberof yarp.client
 * @param {String} time Time data {h, m, s}.
 */
yarp.client.setWorldTime = (time) => {
  mp.game.streaming.startPlayerSwitch(mp.players.local.handle, mp.players.local.handle, 513, 1);
  mp.game.time.setClockTime(time.h, time.m, time.s);
};

/**
 * Executes code on the client.
 * @function runClientCode
 * @memberof yarp.client
 * @param {String} code The code to be executed.
 */
yarp.client.runClientCode = (code) => {
  eval(code);
};

/**
 * Run client function.
 * @function runClientFunction
 * @memberof yarp.client
 * @param {String} func Function name.
 * @param {Array} args Function arguments.
 */
yarp.client.runClientFunction = (func, args) => {
  eval(func)(...args);
};

/**
 * Executes code on the server.
 * @function runServerCode
 * @memberof yarp.client
 * @param {String} code The code to be executed.
 */
yarp.client.runServerCode = (code) => {
  yarp.server.runServerCode(code);
};

/**
 * Executes code on the server.
 * @function runServerFunction
 * @memberof yarp.client
 * @param {String} func Function name.
 * @param {Array} args Function arguments.
 */
yarp.client.runServerFunction = (func, args) => {
  yarp.server.runServerFunction(func, args);
};

/**
 * Binds a key.
 * @function playerBindKey
 * @memberof yarp.client
 * @param {String} id The id of the keybind.
 * @param {String} key The virtual key code.
 */
yarp.client.playerBindKey = (id, key) => {
  if (yarp.hotkeys[id]) {
    mp.keys.unbind(yarp.hotkeys[id].key, false, yarp.hotkeys[id].call);
    yarp.hotkeys[id] = null;
  }
  if ((typeof key) === 'string') key = yarp.utils.client.getVirtualKeys()[key.toUpperCase()];
  yarp.hotkeys[id] = {
    key: key,
    call: () => {
      let disabled = yarp.hotkeys.disabled;
      for (let id in yarp.browsers) {
        if (yarp.browsers.hasOwnProperty(id)) {
          let browser = yarp.browsers[id];
          if (browser.disableHotkeys) {
            disabled = true;
            break;
          }
        }
      }
      if (!disabled && !mp.gui.chat.enabled) {
        yarp.server.playerBoundKeyPressed(id);
      }
    },
  };
  mp.keys.bind(yarp.hotkeys[id].key, false, yarp.hotkeys[id].call);
};

/**
 * Unbind a key.
 * @function playerUnbindKey
 * @memberof yarp.client
 * @param {String} id The id of the keybind.
 */
yarp.client.playerUnbindKey = (id) => {
  if (yarp.hotkeys[id]) {
    mp.keys.unbind(yarp.hotkeys[id].key, false, yarp.hotkeys[id].call);
    yarp.hotkeys[id] = null;
  }
};

/**
 * Returns true if key is pressed.
 * @function isKeyPressed
 * @memberof yarp.client
 * @param {String} key The virtual key code.
 * @return {Boolean} True/false depending if the key is pressed.
 */
yarp.client.isKeyPressed = (key) => {
  mp.keys.isDown(yarp.utils.client.getVirtualKeys()[key.toUpperCase()]); // Without this it returns true after button is released... why ?
  return mp.keys.isDown(yarp.utils.client.getVirtualKeys()[key.toUpperCase()]);
};

/**
 * Open a door.
 * @function playerOpenDoor
 * @memberof yarp.client
 * @param {Object} door Door data.
 */
yarp.client.playerOpenDoor = (door) => {
  mp.game.object.doorControl(door._model, door._position.x, door._position.y, door._position.z, false, 0.0, 50.0, 0.0);
};

/**
 * Close a door.
 * @function playerCloseDoor
 * @memberof yarp.client
 * @param {Object} door Door data.
 */
yarp.client.playerCloseDoor = (door) => {
  mp.game.object.doorControl(door._model, door._position.x, door._position.y, door._position.z, true, 0.0, 50.0, 0.0);
};
