"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./style.less");

var _canvasVideoPlayer = require("./canvas-video-player");

var _lesca = require("lesca");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var playsinline_player = /*#__PURE__*/function (_Component) {
  _inherits(playsinline_player, _Component);

  var _super = _createSuper(playsinline_player);

  function playsinline_player(props) {
    var _this;

    _classCallCheck(this, playsinline_player);

    _this = _super.call(this, props);
    _this.state = {
      loading: false
    };
    return _this;
  }

  _createClass(playsinline_player, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (_lesca.UserAgent.get() === 'mobile') {
        if (_lesca.UserAgent.Ios.is()) this.add_canvas_player();else this.add_video_player();
      } else this.add_video_player();

      this.timer = setInterval(function () {
        if (_this2.refs.video.readyState == 4) {
          if (_this2.props.ready) _this2.props.ready();
          clearInterval(_this2.timer);
        }
      }, 10);
      if (this.props.hide) this.hide();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.interval);
      if (this.video.unbind) this.video.unbind();
    }
  }, {
    key: "setSize",
    value: function setSize(w, h) {
      this.refs.main.style.width = w + 'px';
      this.refs.main.style.height = h + 'px';

      if (_lesca.UserAgent.get() === 'mobile') {
        if (_lesca.UserAgent.Ios.is()) {
          this.video.video.style.width = w + 'px';
          this.video.video.style.height = h + 'px';
          this.video.canvas.width = w;
          this.video.canvas.height = h;
          this.video.setCanvasSize();
        } else {
          this.video.style.width = w + 'px';
          this.video.style.height = h + 'px';
        }
      } else {
        this.video.style.width = w + 'px';
        this.video.style.height = h + 'px';
      }
    }
  }, {
    key: "getDom",
    value: function getDom() {
      return this.refs.main;
    }
  }, {
    key: "hide",
    value: function hide() {
      this.refs.main.style.display = 'none';
    }
  }, {
    key: "show",
    value: function show() {
      this.refs.main.style.display = 'block';
    }
  }, {
    key: "jumpTo",
    value: function jumpTo(v) {
      this.video.jumpTo(v);
    }
  }, {
    key: "pause",
    value: function pause() {
      this.video.pause();
    }
  }, {
    key: "play",
    value: function play() {
      this.video.play();
    }
  }, {
    key: "goto",
    value: function goto(v) {
      this.video["goto"](v);
    }
  }, {
    key: "currentTime",
    value: function currentTime() {
      if (_lesca.UserAgent.get() === 'mobile') {
        if (_lesca.UserAgent.Ios.is()) return this.video.video.currentTime;else return this.video.currentTime;
      } else return this.video.currentTime;
    }
  }, {
    key: "mute",
    value: function mute(v) {
      $('video, video').prop('muted', v);
    }
  }, {
    key: "add_video_player",
    value: function add_video_player() {
      var _this3 = this;

      this.video = this.refs.video;

      this.video["goto"] = function (v) {
        this.currentTime = v;
      };

      if (this.props.loop) this.video.setAttribute('loop', true);

      if (this.props.onupdate) {
        this.interval = setInterval(function () {
          _this3.props.onupdate(_this3.video.currentTime, _this3.video.duration, _this3.video.readyState);
        }, 10);
      }

      if (this.props.autoplay != false) this.video.play();

      this.video.onended = this.props.onend || function () {};
    }
  }, {
    key: "add_canvas_player",
    value: function add_canvas_player() {
      var isMute = true;
      if (_lesca.UserAgent.get() === 'mobile') if (_lesca.UserAgent.Ios.is()) isMute = false;
      this.video = new _canvasVideoPlayer.CanvasVideoPlayer({
        videoSelector: this.refs.video,
        canvasSelector: this.refs.canvas,
        framesPerSecond: this.props.fps || 24,
        hideVideo: true,
        autoplay: this.props.autoplay || true,
        audio: this.props.audio || isMute,
        loop: this.props.loop || false,
        resetOnLastFrame: false,
        onend: this.props.onend ? this.props.onend : function () {},
        onupdate: this.props.onupdate ? this.props.onupdate : function (e, t) {}
      });
    }
  }, {
    key: "append_source",
    value: function append_source() {
      var op = [];

      if (this.props.url.mp4) {
        op.push( /*#__PURE__*/_react["default"].createElement("source", {
          key: 'mp4',
          src: this.props.url.mp4,
          type: "video/mp4"
        }));
      } else if (this.props.url.ogg) {
        op.push( /*#__PURE__*/_react["default"].createElement("source", {
          key: 'ogg',
          src: this.props.url.ogg,
          type: "video/ogg"
        }));
      } else if (this.props.url.ogv) {
        op.push( /*#__PURE__*/_react["default"].createElement("source", {
          key: 'ogv',
          src: this.props.url.ogg,
          type: "video/ogv"
        }));
      } else if (this.props.url.webm) {
        op.push( /*#__PURE__*/_react["default"].createElement("source", {
          key: 'webm',
          src: this.props.url.webm,
          type: "video/webm"
        }));
      }

      return op;
    }
  }, {
    key: "append_player",
    value: function append_player() {
      if (_lesca.UserAgent.get() === 'mobile') {
        if (_lesca.UserAgent.Ios.is()) {
          var _React$createElement;

          return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("canvas", {
            ref: "canvas",
            width: this.props.width || 560,
            height: this.props.height || 560
          }), /*#__PURE__*/_react["default"].createElement("video", (_React$createElement = {
            muted: true,
            ref: "video"
          }, _defineProperty(_React$createElement, "muted", true), _defineProperty(_React$createElement, "width", this.props.width || 560), _defineProperty(_React$createElement, "height", this.props.height || 315), _React$createElement), this.append_source()));
        } else {
          return /*#__PURE__*/_react["default"].createElement("video", {
            muted: true,
            ref: "video",
            width: this.props.width,
            height: this.props.height
          }, this.append_source());
        }
      } else {
        return /*#__PURE__*/_react["default"].createElement("video", {
          muted: true,
          ref: "video",
          width: this.props.width,
          height: this.props.height
        }, this.append_source());
      }
    }
  }, {
    key: "append_loading",
    value: function append_loading() {
      if (this.state.loading) return /*#__PURE__*/_react["default"].createElement(_lesca.Loading, null);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: "main",
        className: "video-playsinline-player",
        style: {
          width: this.props.width ? this.props.width + 'px' : '560px',
          height: this.props.height ? this.props.height + 'px' : '315px'
        }
      }, this.append_player(), this.append_loading());
    }
  }]);

  return playsinline_player;
}(_react.Component);

var _default = playsinline_player;
exports["default"] = _default;