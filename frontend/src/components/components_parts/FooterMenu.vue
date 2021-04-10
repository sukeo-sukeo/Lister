<template>
<div>
  <div class="menu-icons">

    <div
     class="menu-icon"
     v-for="icon in menuIcons" :key="icon.name"
     @click="$emit('menu-icon-click-parts', icon.name)"
     >
     
      <label class="labels" :for="icon.name"
      :class="icon.isActive? 'active' : ''"
      >{{icon.name}}</label>
      <span :id="icon.name" class="iconify" data-inline="false" :data-icon="icon.icon"></span>
    
    </div>

  </div>
</div>
</template>

<script>
export default {
  name: 'FooterMenu',
  props: {
    // clickInLoadList: Boolean,
    currentView: Object
  },
  data: () => {
    return {
      menuIcons: [
        {
          name: 'camera',
          icon: 'ic:baseline-camera-alt',
          isActive: true
        },
        {
          name: 'list',
          icon: 'ic:baseline-list-alt',
          isActive: false
        },
        {
          name: 'save',
          icon: 'ic:baseline-save',
          isActive: false
        },
        {
          name: 'load',
          icon: 'ic:baseline-insert-chart',
          isActive: false
        },
      ]
    }
  },
  methods: {
    activeChange(clickName) {
      if (clickName === "save") {
        return
      } 
      this.menuIcons.forEach(icon => {
        if (icon.name === clickName) {
          icon.isActive = true
        } else {
          icon.isActive = false
        }
      })
    }
  },
  watch: {
    // clickInLoadList: {
    //   handler() {
    //     console.log(this.clickInLoadList);
    //     if (this.clickInLoadList) {
    //       this.activeChange('list')
    //     }
    //   },
    //   deep: true
    // },
    currentView: {
      handler() {
        if (this.currentView.video) {
          console.log('video');
          this.activeChange('camera')
        }
        if (this.currentView.list) {
          console.log('list');
          this.activeChange('list')
        }
        if (this.currentView.load) {
          console.log('load');
          this.activeChange('load')
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: .3s;
}

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

.active {
  background: #54EF89;
  border-radius: 15%;
  padding: 2px;
}
</style>