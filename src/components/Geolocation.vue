/* global google:true */
/* eslint no-undef: "error" */

<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <div>
            <button type="button" v-on:click="getLocation">Get Location</button>
            <ul>
                <li>Latitude: {{ latitude }}</li>
                <li>Longitude: {{ longitude }}</li>
                <li>Altitude: {{ altitude }}</li>
            </ul>
        </div>
        <div id="out_map"></div>
        <gmap-map
            :center="center"
            :zoom="11"
            style="width: 500px; height: 300px"
        ><gmap-marker
            :key="index"
            v-for="(m,index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            &click="center=m.position"
        ></gmap-marker>
        </gmap-map>
    </div>
</template>
<script>
  import * as VueGoogleMaps from 'vue2-google-maps';
  import Vue from 'vue';

  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyDR_YxJ_CzAuOP0l2Nutvs4axQdRhUC3vU',
      v: 'OPTIONAL VERSION NUMBER',
    },
  });
  export default {
    name: 'hello',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        latitude: '',
        longitude: '',
        altitude: '',
        uluru: '',
        map: '',
        center: '',
        markers: [{
          position: { lat: this.latitude, lng: this.longitude },
        }, {
          position: { lat: this.latitude, lng: this.longitude },
        }],
      };
    },
    methods: {
      getLocation() {
        const geo = navigator.geolocation;
        if (geo === undefined) {
          console.log('No geolocation support');
        }
        geo.getCurrentPosition(this.success, this.error, { enableHighAccuracy: true });
      },
      success(position) {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.altitude = position.coords.altitude;
        this.center = { lat: position.coords.latitude, lng: position.coords.longitude };
        this.markers = [{ position: { lat: this.latitude, lng: this.longitude } },
          { position: { lat: this.latitude, lng: this.longitude } }];
        /* this.img = new Image();
        this.img.src = `https://maps.googleapis.com/maps/api/staticmap?center=${this.latitude},${this.longitude}&zoom=13&size=300x300&sensor=false`;
        document.getElementById('out_img').appendChild(this.img); */
      },
      /* initMap() {
        this.uluru = { lat: this.latitude, lng: this.longitude };
        this.map = new google.maps.Map(document.getElementById('out_map'), {
          zoom: 4,
          center: this.uluru,
        });
        this.marker = new google.maps.Marker({
          position: this.uluru,
          map: this.map,
        });
      }, */
      error(ex) {
        console.log(ex.message);
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>