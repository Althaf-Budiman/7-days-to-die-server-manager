/**
 * SdtdServer.js
 *
 * @description  Represents a 7 Days to Die server
 * @class SdtdServer
 */

module.exports = {

  customToJSON: function () {
    return _.omit(this, ['authToken', 'authName', 'telnetPort', 'telnetPassword']);
  },

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    /**
     * @memberof SdtdServer
     * @var {string} name
     */

    name: {
      type: 'string'
    },

    /**
     * @var {string} ip
     * @memberof SdtdServer
     */

    ip: {
      type: 'string',
      required: true
    },

    /**
     * @memberof SdtdServer
     * @var {number} gamePort
     * @description Port used by players to join the game
     */

    gamePort: {
      type: 'number'
    },

    /**
     * @memberof SdtdServer
     * @var {number} telnetPort
     */

    telnetPort: {
      type: 'number',
      required: true
    },

    /**
     * @memberof SdtdServer
     * @var {number} webPort
     * @description Port provided by Alloc's webserver
     */

    webPort: {
      type: 'number'
    },

    /**
     * @memberof SdtdServer
     * @var {string} authName
     * @description adminuser to use during webrequests
     */

    authName: {
      type: 'string'
    },

    /**
     * @memberof SdtdServer
     * @var {string} authToken
     * @description admintoken to use during webrequests
     */

    authToken: {
      type: 'string'
    },

    /**
     * @memberof SdtdServer
     * @var {boolean} loggingEnabled
     * @description Whether or not logging is enabled
     * @default true
     */

    loggingEnabled: {
      type: 'boolean',
      defaultsTo: true
    },

    /**
     * @memberof SdtdServer
     * @var {json} countryBanConfig
     * @description Config for country ban
     */

    countryBanConfig: {
      type: 'json',
      defaultsTo: {
        enabled: false,
        bannedCountries: [],
        kickMessage: 'Your country has been blocked on this server.',
        allowNull: true
      },
    },

    /**
     * @memberof SdtdServer
     * @var {string} discordGuildId
     * @description Id of the dicscord guild this server is associated with
     */

    discordGuildId: {
      type: 'string'
    },

    /**
     * @memberof SdtdServer
     * @var {string} chatChannelId
     * @description Id of the discord channel for chat bridge
     */

    chatChannelId: {
      type: 'string'
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    /**
     * @memberof SdtdServer
     * @var owner
     * @description Owner of the server, corresponds to a User
     */

    owner: {
      model: 'user',
      required: true
    },

    /**
     * @memberof SdtdServer
     * @var admins
     * @description Users allowed to perform admin actions on the server
     */

    admins: {
      collection: 'user',
    },

    /**
     * @memberof SdtdServer
     * @var players
     * @description Collection of Players that have logged on the server
     */

    players: {
      collection: 'player',
      via: 'server'
    }
  },

};
