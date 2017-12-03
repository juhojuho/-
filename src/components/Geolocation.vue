/* global google:true */
/* eslint no-undef: "error" */


<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <div id="out_img"></div>
        <div>
            <!-- button type="button" v-on:click="getLocation">Get Location</button-->
            <ul>
                <!--li>Latitude: {{ latitude }}</li>
                <li>Longitude: {{ longitude }}</li>
                <li>Nearest: {{ nearest }} </li-->
                <li> <img src="../assets/images/google-maps-pin-red-th.png"/> : 내 위치</li>
                <li> <img src="../assets/images/google-maps-pin-blue-th.png"/> : 가장 가까운 급식소 "{{ nearest }} !" </li>
                <li> <img src="../assets/images/google-maps-pin-green-th.png"/> : 모든 급식소</li>
            </ul>
        </div>
        <!-- gmap-map
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
        </gmap-map-->
    </div>
</template>
<script>
  import * as VueGoogleMaps from 'vue2-google-maps';
  import Vue from 'vue';

  Vue.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyDR_YxJ_CzAuOP0l2Nutvs4axQdRhUC3vU',
    },
  });
  export default {
    name: 'hello',
    data() {
      return {
        msg: '길고양이 급식소 마커',
        latitude: '',
        longitude: '',
        altitude: '',
        uluru: '',
        map: '',
        center: '',
        N1: '&markers=color:green%7Clabel:G%7C36.371399,127.358637',
        W1: '&markers=color:green%7Clabel:G%7C36.367876,127.361914',
        E1: '&markers=color:green%7Clabel:G%7C36.371455,127.364421',
        E2: '&markers=color:green%7Clabel:G%7C36.369044,127.366264',
        nearest: '',
      };
    },
    created() {
      this.getLocation();
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
        document.getElementById('out_img').innerHTML = '';
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.altitude = position.coords.altitude;
        this.center = { lat: position.coords.latitude, lng: position.coords.longitude };
        /* this.markers = [{ position: { lat: this.latitude, lng: this.longitude } },
          { position: { lat: this.latitude, lng: this.longitude } }]; */
        this.setNearest();
        this.img = new Image();
        this.img.src = `https://maps.googleapis.com/maps/api/staticmap?center=${this.latitude},${this.longitude}&zoom=15&size=500x300&sensor=false&maptype=roadmap`;
        this.img.src += this.N1; this.img.src += this.W1;
        this.img.src += this.E1; this.img.src += this.E2;
        this.img.src += `&markers=color:red%7Clabel:M%7C${this.latitude},${this.longitude}`;
        console.log(this.img.src);
        document.getElementById('out_img').appendChild(this.img);
      },
      setNearest() {
        console.log(this.latitude);
        const N1Dist = (this.latitude - 36.371399) ** 2 + (this.longitude - 127.358637)**2; // eslint-disable-line
        const W1Dist = (this.latitude - 36.367876) ** 2 + (this.longitude - 127.361914)**2; // eslint-disable-line
        const E1Dist = (this.latitude - 36.371455) ** 2 + (this.longitude - 127.364421)**2; // eslint-disable-line
        const E2Dist = (this.latitude - 36.369044) ** 2 + (this.longitude - 127.366264)**2; // eslint-disable-line
        const MinDist = Math.min(N1Dist, W1Dist, E1Dist, E2Dist);
        console.log(N1Dist);
        if (MinDist === N1Dist) {
          this.nearest = 'N1';
          this.N1 = '&markers=color:blue%7Clabel:N%7C36.371399,127.358637';
        } else if (MinDist === W1Dist) {
          this.nearest = 'W1';
          this.W1 = '&markers=color:blue%7Clabel:N%7C36.367876,127.361914';
        } else if (MinDist === E1Dist) {
          this.nearest = 'E1';
          this.E1 = '&markers=color:blue%7Clabel:N%7C36.371455,127.364421';
        } else if (MinDist === E2Dist) {
          this.nearest = 'E2';
          this.E2 = '&markers=color:green%7Clabel:N%7C36.369044,127.366264';
        }
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
