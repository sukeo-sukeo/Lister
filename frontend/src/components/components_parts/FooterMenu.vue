<template>
<div>
  <div class="menu-icons">

    <div
     class="menu-icon"
     @click="$emit('changeToListContainer(icon.name)')"
     v-for="icon in menuIcons" :key="icon.name">

      <label class="labels" :for="icon.name">{{icon.name}}</label>
      <span :id="icon.name" class="iconify" data-inline="false" :data-icon="icon.icon"></span>
    
    </div>

  </div>
</div>
</template>

<script>
export default {
  name: 'FooterMenu',
  data: () => {
    return {
        menuIcons: [
          {
           name: 'camera',
           icon: 'ic:baseline-camera-alt'
          },
          {
           name: 'list',
           icon: 'ic:baseline-list-alt'
          },
          {
           name: 'delete',
           icon: 'ic:baseline-delete'
          },
          {
           name: 'chart',
           icon: 'ic:baseline-insert-chart'
          },
        ]
      }
    },
  }
</script>

<style scoped>
.labels {
  font-size: 8px;
}

.menu-icon {
  display: flex;
  flex-direction: column-reverse;
  text-align: center;
}

.menu-icons {
  position: relative;
  font-size: 38px;
  margin: 6px 20px 0px 20px;
  display: flex;
  justify-content: space-around;
}
</style>