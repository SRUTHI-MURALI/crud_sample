$("#add_user").submit(function(event){

    if (validateBasic()) {

        alert("Data Inserted Successfully");
        
    }
    
})

$("#update_user").submit(function(event){
    event.preventDefault()
    if (validateBasic()){
    var unindexed_array=$(this).serializeArray();
    var data={}

    $.map(unindexed_array,function(n,i){
        data[n['name']]=n['value']
        
    })

    // console.log(data)

    var request={
        'url':`http://localhost:2008/api/users/${data.id}`,
        "method":'PUT',
        "data":data
    }

    $.ajax(request).done(function(response){

        alert("Data updated successfully")
            
            

        })
       
         
    }
    
})

if(window.location.pathname=='/admin_panel'){
    $ondelete=$(".table tbody td a.delete")
    $ondelete.click(function(){
        var id=$(this).attr("data-id")

        var request={
            'url':`http://localhost:2008/api/users/${id}`,
            "method":'DELETE'
            
        }

        if(confirm("Do you really want to delete?")){
            $.ajax(request).done(function(response){
                alert("Data deleted successfully")
                location.reload()
            })
        }
    })
}

if(window.location.pathname=='/search'){
    $ondelete=$(".table tbody td a.delete")
    $ondelete.click(function(){
        var id=$(this).attr("data-id")

        var request={
            'url':`http://localhost:2008/api/users/${id}`,
            "method":'DELETE'
            
        }

        if(confirm("Do you really want to delete?")){
            $.ajax(request).done(function(response){
                alert("Data deleted successfully")
                location.reload()
            })
        }
    })
}