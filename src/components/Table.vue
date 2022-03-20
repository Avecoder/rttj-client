<template>
  <div class="table">
    <table>
      <thead>
        <tr>
          <th v-for="label in tableLabel">{{label}}</th>
          <th v-if="addDelete"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in tableData">
          <td v-for="item in row">{{item}}</td>
          <td v-if="addDelete" class="delete">
            <a href="#" :taskID="tasksID[index]" @click.prevent="$emit('deleteTask', tasksID[index])">Удалить</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>

import {ref} from 'vue'

const props = defineProps(['tableLabel', 'tableData', 'addDelete', 'tasksID'])


</script>

<style lang="scss" scoped>
  @import '../assets/styles/variables.scss';

  .table{
    background: #fff;
    border-radius: 12px;
    box-shadow: 0px 0px 12px $grey;
    box-sizing: border-box;
    width: auto;
    height: auto;
    // max-width: 750px;
    padding: 33px 40px;
    margin-bottom: 56px;
    table{
      width: 100%;
      font-family: $ff;
      thead{
        margin-bottom: 24px;
        tr{
          display: -webkit-flex;
          display: -ms-flex;
          display: flex;
          th{
            text-align: center;
            font-style: normal;
            font-weight: normal;
            font-size: 16px;
            line-height: 19px;
            display: flex;
            flex: 1;
            display: -webkit-flex;
            display: -ms-flex;
            display: flex;
            justify-content: center;
            padding-bottom: 24px;
          }
        }
      }
      tbody{
        tr{
          display: -webkit-flex;
          display: -ms-flex;
          display: flex;
          td{
            text-align: center;
            font-weight: 300;
            font-size: 14px;
            line-height: 16px;
            padding: 8px 0;
            border: none;
            display: flex;
            flex: 1;
            display: -webkit-flex;
            display: -ms-flex;
            display: flex;
            justify-content: center;
          }
          &:nth-child(2n+1){
            background: $grey;
            border-radius: 4px;
          }
        }
      }
    }
  }

  #app{
    &.dark{
      .delete{
        a{
          color: $cyan;
        }
      }
    }
  }
</style>
