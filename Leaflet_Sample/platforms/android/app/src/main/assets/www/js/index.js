/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        // 【Default Code】 ↓↓↓↓↓
        // var parentElement = document.getElementById(id);
        // var listeningElement = parentElement.querySelector('.listening');
        // var receivedElement = parentElement.querySelector('.received');

        // listeningElement.setAttribute('style', 'display:none;');
        // receivedElement.setAttribute('style', 'display:block;');
        // 【Default Code】 ↑↑↑↑↑
        
        // 【Leaflet.js用Code】　↓↓↓↓↓
        //ズームコントロールを非表示
        var map = L.map('mapid', { zoomControl: false });
        // 地図を作成する
        var mymap = map.setView([35.494505, 137.500998], 15);

        //スケールコントロールを最大幅200px、右下、m単位で地図に追加
        L.control.scale({ maxWidth: 200, position: 'bottomright', imperial: false }).addTo(mymap);
        
        //ズームコントロールを左下で地図に追加
        L.control.zoom({ position: 'bottomleft' }).addTo(mymap);
        
        //地理院地図の標準地図タイル
        var gsi =L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png', 
          {attribution: "<a href='https://maps.gsi.go.jp/development/ichiran.html' target='_blank'>地理院タイル</a>"});
        //地理院地図の淡色地図タイル
        var gsipale = L.tileLayer('http://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
          {attribution: "<a href='http://portal.cyberjapan.jp/help/termsofuse.html' target='_blank'>地理院タイル</a>"});
        //オープンストリートマップのタイル
        var osm = L.tileLayer('http://tile.openstreetmap.jp/{z}/{x}/{y}.png',
          {  attribution: "<a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> contributors" });
        //baseMapsオブジェクトのプロパティに3つのタイルを設定
        var baseMaps = {
          "地理院地図" : gsi,
          "淡色地図" : gsipale,
          "オープンストリートマップ"  : osm
        };
        //layersコントロールにbaseMapsオブジェクトを設定して地図に追加
        //コントロール内にプロパティ名が表示される
        L.control.layers(baseMaps).addTo(mymap);
        gsi.addTo(mymap);

        // WellCafeのマーカーを作成する
        //ポップアップする文字（HTML可、ここでは画像を表示）
        var sucontents = "WellCafe<br><img src='/www/css/images/WellCafe.png' width='524' height='269'>"
        //ポップアップオブジェクトを作成
        var popup1 = L.popup({ maxWidth: 550 }).setContent(sucontents);
        var marker_wellcafe = L.marker([35.494505, 137.500998]).addTo(mymap);
        // クリックした際にポップアップメッセージを表示する
        marker_wellcafe.bindPopup(popup1);

        // 川上屋のマーカーを作成する
        var marker_kawakamiya = L.marker([35.4945524, 137.50075449999997]).addTo(mymap);
        // クリックした際にポップアップメッセージを表示する
        marker_kawakamiya.bindPopup("川上屋");

        console.log('Received Event: ' + id);
        // 【Leaflet.js用Code】　↑↑↑↑↑
    }
};

app.initialize();