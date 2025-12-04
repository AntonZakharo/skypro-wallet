<template>
  <div class="center">
    <div class="row cf">
      <div class="span">
        <div class="typing_loader"></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.cf:before,
.cf:after {
  content: ' '; /* 1 */
  display: table; /* 2 */
}

.cf:after {
  clear: both;
}
.row {
  text-align: center;
  padding: 50px 0;
}
.span {
  float: left;
  vertical-align: middle;
  border-radius: 1px;
}
.span:last-child {
  margin-right: 0px;
}
.typing_loader {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  -webkit-animation: typing 1s linear infinite alternate;
  -moz-animation: Typing 1s linear infinite alternate;
  animation: typing 1s linear infinite alternate;
  position: relative;
}
@-webkit-keyframes typing {
  0% {
    background-color: rgba(0, 0, 0, 1);
    box-shadow:
      12px 0px 0px 0px rgba(0, 0, 0, 0.2),
      24px 0px 0px 0px rgba(0, 0, 0, 0.2);
  }
  25% {
    background-color: rgba(0, 0, 0, 0.4);
    box-shadow:
      12px 0px 0px 0px rgba(0, 0, 0, 2),
      24px 0px 0px 0px rgba(0, 0, 0, 0.2);
  }
  75% {
    background-color: rgba(0, 0, 0, 0.4);
    box-shadow:
      12px 0px 0px 0px rgba(0, 0, 0, 0.2),
      24px 0px 0px 0px rgba(0, 0, 0, 1);
  }
}

@-moz-keyframes typing {
  0% {
    background-color: rgba(0, 0, 0, 1);
    box-shadow:
      12px 0px 0px 0px rgba(0, 0, 0, 0.2),
      24px 0px 0px 0px rgba(0, 0, 0, 0.2);
  }
  25% {
    background-color: rgba(0, 0, 0, 0.4);
    box-shadow:
      12px 0px 0px 0px rgba(0, 0, 0, 2),
      24px 0px 0px 0px rgba(0, 0, 0, 0.2);
  }
  75% {
    background-color: rgba(0, 0, 0, 0.4);
    box-shadow:
      12px 0px 0px 0px rgba(0, 0, 0, 0.2),
      24px 0px 0px 0px rgba(0, 0, 0, 1);
  }
}

@keyframes typing {
  0% {
    background-color: rgba(0, 0, 0, 1);
    box-shadow:
      12px 0px 0px 0px rgba(0, 0, 0, 0.2),
      24px 0px 0px 0px rgba(0, 0, 0, 0.2);
  }
  25% {
    background-color: rgba(0, 0, 0, 0.4);
    box-shadow:
      12px 0px 0px 0px rgba(0, 0, 0, 2),
      24px 0px 0px 0px rgba(0, 0, 0, 0.2);
  }
  75% {
    background-color: rgba(0, 0, 0, 0.4);
    box-shadow:
      12px 0px 0px 0px rgba(0, 0, 0, 0.2),
      24px 0px 0px 0px rgba(0, 0, 0, 1);
  }
}
</style>
