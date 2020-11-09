<template>
  <v-navigation-drawer fixed app dark :mini-variant="mini">
    <v-container fluid display-1 font-weight-black text-uppercase
                 style="-webkit-user-select: none;-webkit-app-region: drag"
                 v-show="!mini"
    >
      <v-layout>
        <v-flex layout justify-center align-center>
          <img id="logo" src="~@/assets/img/com/logo.png" alt="electron-vue">
        </v-flex>
      </v-layout>
    </v-container>

    <v-list>
      <template v-for="(item, i) in items">
        <v-layout row
                v-if="item.heading"
                align-center
                :key="i"
        >
          <v-flex xs6>
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-flex>
          <v-flex xs6 class="text-xs-right" v-if="item.heading === 'Home'" v-show="!mini">
            <v-btn small flat color="orange">Add</v-btn>
          </v-flex>
        </v-layout>
        <v-divider
                dark
                v-else-if="item.divider"
                class="my-3"
                :key="i"
        >
        </v-divider>
        <v-list-tile
                :to="item.to"
                :key="i"
                v-else-if="item.isSingle"
                @click=""
                active-class="orange"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-group
                v-else-if="item.isGroup"
                :prepend-icon="item.icon"
                no-action
                @click="mini = false"
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
                  v-for="subItem in item.items"
                  :key="subItem.text"
                  @click=""
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.text }}</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-icon>{{ subItem.icon }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list-group>
      </template>
      <v-list-tile
              class="nav-item-logout"
              active-class="orange"
      >
        <v-list-tile-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            Logout
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import {
  mapMutations,
  mapState
} from 'vuex'

export default {
  data: () => ({
    title: 'Nvue',
   // logo: require('/src/renderer/assets/img/com/logo.png'),
    drawer: null,
    items: [
      {heading: 'Home'},
      {isSingle: true, icon: 'home', text: 'Dashboard', to: '/'},
      {heading: 'System'},
      {isSingle: true, icon: 'settings', text: 'Settings', to: '/settings'},
      {isSingle: true, icon: 'help', text: 'Help', to: '/help'}
    ],
    mini: false,
    right: null,
    isMaximized: false
  }),
  computed: {
    ...mapState('app', ['image', 'color'])
  },
  mounted () {
    console.log("::")
  },
  beforeDestroy () {
  },
  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer'])
  }
}
</script>

<style lang="scss">
  #app-drawer{
    .v-list__tile {
      border-radius: 4px;
      &--buy {
        margin-top: auto;
        margin-bottom: 17px;
      }
    }
    .v-image__image--contain {
      top: 9px;
      height: 60%;
    }
    .search-input {
      margin-bottom: 30px !important;
      padding-left: 15px;
      padding-right: 15px;
    }
  }
</style>
