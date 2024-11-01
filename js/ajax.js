function ajax(data, ajaxUrl, callback) {

    let object = this;

    object.request(data, ajaxUrl, callback);

}

ajax.prototype.request = function(data, ajaxUrl, callback) {

    let object = this;

    try {

        let xhr = new XMLHttpRequest();

        xhr.onload = function(e){

            if (callback != null && typeof callback == "function") {
				
				if (xhr.status == 200 || xhr.status == 304) {

					var responseJson = JSON.parse(xhr.responseText || 'null');
					callback(responseJson);
					
				} else {
					
					var text = xhr.responseText;
					window.alert("通信エラー. HTTP Status: " + xhr.status);
					
				}
					
            }
        
        }
        xhr.onerror = function(e){
            window.alert('エラーが画出ました');
            console.log(e);
        }

        xhr.open("POST", ajaxUrl);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(this.encodeHTMLForm(data));

    } catch(e) {

    } finally {
        
    }
}

ajax.prototype.encodeHTMLForm = function(data) {

    var params = [];
		
    for( var name in data ){
        
        var value = data[ name ];
        var param = encodeURIComponent( name ) + '=' + encodeURIComponent( value );
        
        params.push( param );
    }
    
    return params.join( '&' ).replace( /%20/g, '+' );

}