angular.module( 'myApp' ).factory( 'OrderService', [ '$q', '$timeout', '$http', function( $q, $timeout, $http ){

    return ({
      getOrders: getOrders,
      getOrder: getOrder,
      createOrder: createOrder,
      deleteOrder: deleteOrder,
    });


    function createOrder( order ){
      return $http({ method: 'POST', url: '/api/orders', data: order });
    }

    function deleteOrder( ID ){
      return $http({ method: 'DELETE', url: '/api/orders/'+ID });
    }


    function getOrder( id ){

      var deferred = $q.defer();

      $http.get( '/api/orders/'+id ).then(
        function successCallback( res ) {

            if( res.data ){
              deferred.resolve( res.data );
            } else {
              deferred.reject();
            }

        }, function errorCallback( res ){

          deferred.reject();
        }
      );

      return deferred.promise;
    }


    function getOrders(){
      
      var deferred = $q.defer();

      $http.get( '/api/orders' ).then(
        function successCallback( res ) {

            if( res.data.orders ){
              deferred.resolve( res.data.orders );
            } else {
              deferred.reject();
            }

        }, function errorCallback( res ){

          deferred.reject();
        }
      );

      return deferred.promise;
    }


}]);