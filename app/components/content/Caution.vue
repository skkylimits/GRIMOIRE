<!-- Negative potential consequences of an action. -->

<template>
    <div :class="['alert', alertTypeClass]">
      <p class="alert-title">
        <span :class="iconClass" aria-hidden="true"></span> {{ title }}
      </p>
      <p class="alert-content">
        <slot></slot>
      </p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Alert',
    props: {
      type: {
        type: String,
        default: 'note',
        validator: value => ['note', 'caution', 'warning', 'error', 'success'].includes(value)
      },
      title: {
        type: String,
        default: 'Note'
      }
    },
    computed: {
      alertTypeClass() {
        return `alert--${this.type}`;
      },
      iconClass() {
        switch (this.type) {
          case 'note':
            return 'docon docon-status-info-outline';
          case 'caution':
            return 'docon docon-status-warning-outline';
          case 'warning':
            return 'docon docon-status-warning-outline';
          case 'error':
            return 'docon docon-status-error-outline';
          case 'success':
            return 'docon docon-status-success-outline';
          default:
            return 'docon docon-status-info-outline';
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .alert {
    padding: 16px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    background-color: #f3f4f6;
    margin-bottom: 16px;
    border: 1px solid transparent;
  }
  
  .alert-title {
    display: flex;
    align-items: center;
    font-weight: bold;
    margin-bottom: 8px;
  }
  
  .alert-content {
    font-size: 14px;
  }
  
  .alert--note {
    border-color: #0078d4;
    background-color: #e7f3ff;
    color: #004578;
  }
  
  .alert--caution {
    border-color: #ffb900;
    background-color: #fff4ce;
    color: #8a6d3b;
  }
  
  .alert--warning {
    border-color: #ffb900;
    background-color: #fff4ce;
    color: #8a6d3b;
  }
  
  .alert--error {
    border-color: #d83b01;
    background-color: #fde7e9;
    color: #a80000;
  }
  
  .alert--success {
    border-color: #107c10;
    background-color: #dff6dd;
    color: #004b1c;
  }
  
  .docon {
    margin-right: 8px;
    font-size: 20px;
  }
  </style>
  